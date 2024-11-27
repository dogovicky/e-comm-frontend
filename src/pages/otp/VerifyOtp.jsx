import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  if (!user || !user.email) {
    navigate("/auth/signup");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/auth/verify-otp";
    axios
      .post(
        url,
        { email: user.email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, otp }),
        }
      )
      .then((response) => {
        if (response.ok) {
          console.log("Account verified");
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="verify_otp">
        <div>An OTP has been sent to your inbox for verification</div>
        <div className="form_container">
          <Form>
            <Form.Group className="mb-3" controlId="otp">
              <Form.Label>Enter OTP sent</Form.Label>
              <Form.Control
                type="text"
                placeholder="xxx xxx"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleSubmit}>
              Verify
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
