import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { sellerHotels } from "../actions/hotel";
import { Card, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [matchResult, setMatchResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      rememberLastUsedCamera: true,
      fps: 5,
    });

    scanner.render(success, error);

    async function success(result) {
      if (window.localStorage.getItem("auth")) {
        let seller = JSON.parse(localStorage.getItem("auth"));
        let { data } = await sellerHotels(seller.token);
        setScanResult(result);

        let match = false;
        data.forEach((item) => {
          if (item._id === result) {
            match = true;
            setMatchResult(match);
            return;
          }
        });
        if (match) {
          console.log("match found");
          scanner.clear();
          window.localStorage.removeItem("HTML5_QRCODE_DATA");
        } else {
          console.log("match not found");
          scanner.clear();
          window.localStorage.removeItem("HTML5_QRCODE_DATA");
        }
      }
    }
    function error(error) {
      console.log("QRCode not found!");
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {scanResult ? (
          <Card
            title={<span style={{ fontSize: "60px" }}>SCAN RESULT</span>}
            style={{
              fontSize: "50px",
              width: 1000,
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <Text strong style={{ fontSize: "30px" }}>
              Match:{" "}
            </Text>
            <Text
              style={{ fontSize: "30px" }}
              type={matchResult ? "success" : "danger"}
            >
              {matchResult ? "TRUE" : "FALSE"}
            </Text>
            <Divider />
            <Text strong style={{ fontSize: "30px" }}>
              Your Booking with hotel ID:{" "}
            </Text>
            <Text
              strong
              style={{
                fontSize: "30px",
                color: "lightblue",
                fontStyle: "italic",
              }}
            >
              {scanResult}{" "}
            </Text>
            <br />
            <Text strong style={{ fontSize: "30px" }}>
              {matchResult
                ? "belongs to this seller"
                : "doesn't belong to this seller"}
            </Text>
            <Divider />
            <Text type="secondary" strong style={{ fontSize: "30px" }}>
              {matchResult
                ? "Check-in completed, welcome to our hotel!"
                : "Please try again!"}
            </Text>
            <Divider />
            {matchResult ? (
              <button
                className="btn btn-outline-primary m-2"
                onClick={() => {
                  navigate("/");
                  navigate(0);
                }}
              >
                Back to hotels
              </button>
            ) : (
              <button
                className="btn btn-outline-primary m-2"
                onClick={() => {
                  navigate("/qr-code");
                  navigate(0);
                }}
              >
                Scan Again
              </button>
            )}
          </Card>
        ) : (
          <>
            <Title style={{ textAlign: "center" }} level={1}>
              Scan your QR Code Here!
            </Title>
            <div
              className="col-md-4"
              id="reader"
              style={{ width: "500px", backgroundColor: "lightblue" }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scanner;
