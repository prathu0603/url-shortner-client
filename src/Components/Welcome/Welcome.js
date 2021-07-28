import React from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcomePage">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://fcit.usf.edu/matrix/wp-content/uploads/2017/01/DanceBot-3-LG.gif"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Url Shortner
          </Navbar.Brand>
          <Nav
            className="me-auto"
            className="d-flex justify-content-end navtext"
          >
            <Nav.Link as={NavLink} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signin">
              Signin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="textContainer d-flex">
        <div>
          <p>Short links, big results</p>
          <p1>
            A URL shortener built with powerful tools to help you grow and
            protect your brand.
          </p1>
        </div>
        <div>
          <img
            alt="logo"
            className="gif"
            src="https://www.fama.org/wp-content/uploads/2016/12/cropped-FAMA-Logo-Transparent-Background-1.png"
          />
          {/* <button>Get Started</button> */}
        </div>
      </Container>
      <Container>
        <div>
          <NavLink to="/signin">
            <button className="button">Get Started</button>
          </NavLink>
        </div>
      </Container>
      <div className="alertText">
        {" "}
        * Signin Is Compulsory To Access URL Shortner.
      </div>
    </div>
  );
};

export default Welcome;
