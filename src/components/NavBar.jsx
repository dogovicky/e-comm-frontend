import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form } from "react-bootstrap";

const NavBar = () => {
  const { state } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">
          <span style={{ fontSize: "0.85em", fontWeight: "bold" }}>BEST</span>{" "}
          <span className="badge text-bg-info">BUY</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <div className="input-box">
              <Form.Control type="text" placeholder="Search" />
            </div>
          </Nav>
          <Nav>
            {state.isAuthenticated ? (
              <Nav.Link as={Link} to="/profile">
                My Account
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth/login">
                Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/help">
              <i className="bi bi-question-circle"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
