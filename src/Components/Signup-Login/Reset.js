import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Reset = () => {
  const [email, setEmail] = useState("");

  const ResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Fill The Email", {
        position: "top-right",
      });
    } else {
      const res = await fetch(
        "https://url-shortner-server-1.herokuapp.com/api/url/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.status == 401) {
        window.alert("Create A Account First");
      } else if (res.status == 500) {
        window.alert("Server Errors");
      } else if (res.status == 200) {
        window.alert("Email Send, Check it.");
      } else window.alert("Sserious Issues@");
    }
  };
  return (
    <div className="mt-5">
      <Container>
        <h3>Password Reset Page !</h3>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Enter Mail</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Gopi@gmail.com"
            />
          </Form.Group>
          <br />
          <Row>
            <Col>
              <Button type="submit" onClick={ResetPassword}>
                Reset Password
              </Button>
            </Col>
            <Col>
              <NavLink to="/signup">Create An Account</NavLink>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Reset;
