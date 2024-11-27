import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/auth/signup";
    try {
      const response = axios.post(url, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const { token } = response.data;
      console.log(token);
      signup(newUser, token);
      navigate("/auth/verify-otp", { state: newUser });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="sign_up">
        <h4>Sign Up and enjoy our services</h4>
        <div className="form_container">
          {loading && "Loading..."}
          <Form>
            <div className="user_names">
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={newUser.first_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={newUser.last_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+254 712345678"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleSubmit}>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

// .then((response) => {
//   dispatch({
//     type: "SIGNUP",
//     payload: response.data,
//   });
//   const { token } = response.data;
//   navigate("/auth/verify-otp", { state: newUser });
// })
// .catch((error) => {
//   return error.message;
// });
// setLoading(true);
