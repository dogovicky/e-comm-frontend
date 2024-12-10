import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  //const { state, dispatch } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await axios.post(url, loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      const { user, token } = response.data;
      console.log(token);
      login(user, token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   console.log("Updated state", state);
  // }, [state]);

  return (
    <>
      <div className="login">
        <h4>Login</h4>
        <div className="form_container">
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={loginDetails.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginDetails.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <div className="sign_up">
            <h4>
              Don't have an account yet ? <Link to="/auth/signup">Sign Up</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
