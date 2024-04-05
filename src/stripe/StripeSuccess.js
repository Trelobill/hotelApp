import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
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
        // navigate("/dashboard");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [navigate, token, hotelId]);

  return (
    <div className="container">
      <div>
        <QRCode value={hotelId} />
      </div>
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
