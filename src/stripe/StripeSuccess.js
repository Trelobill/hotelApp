import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../actions/hotel";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

const StripeSuccess = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { hotelId } = useParams();

  useEffect(() => {
    // console.log("send this hotelId to backend to create order", hotelId);
    stripeSuccessRequest(token, hotelId).then((res) => {
      if (res.data.success) {
        console.log("stripe success response", res.data);
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [navigate, token, hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      // If the entered value is not a valid email address
      toast.error("Please enter a valid email address.");
      return;
    }

    const svg = document.getElementById("qrcode");
    const img = new Image();

    img.onload = function () {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas content to PNG format
      const pngDataUrl = canvas.toDataURL("image/png");

      // Create an <img> element with the PNG data URL
      const imgElement = document.createElement("img");
      imgElement.src = pngDataUrl;

      let data = new FormData();
      data.append("email", email);
      data.append("image", pngDataUrl); // Append the PNG data URL directly

      // Send email with FormData
      sendEmailWithImage(data);
    };
    // Set the source of the Image object to the SVG content
    img.src = "data:image/svg+xml," + encodeURIComponent(svg.outerHTML);
  };

  // Function to send email with FormData containing image data
  const sendEmailWithImage = async (data) => {
    try {
      // Send email with FormData
      const res = await sendEmail(data);
      console.log("EMAIL SEND RES===>", res);
      toast.success("Email sent successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email.");
    }
  };

  return (
    <div className="container">
      <QRCode id="qrcode" type="png" value={hotelId} />
      <br />
      <h1 className="text-center mb-4">Send me QR code at e-mail too.</h1>

      <div className="d-flex justify-content-center">
        <input
          type="email"
          name="email"
          id="emailInput"
          className="form-control-lg"
          placeholder="Enter your email"
        />
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button onClick={handleSubmit} className="btn btn-primary mx-2">
          Send
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          type="button"
          className="btn btn-secondary mx-2"
        >
          No Need
        </button>
      </div>
    </div>
  );
};

export default StripeSuccess;
