import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const PasswordReset = () => {
  const history = useHistory();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const ResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.warn("Fill The Password", {
        position: "top-right",
      });
    } else {
      const res = await fetch(
        "https://url-shortner-server-1.herokuapp.com/api/url/password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password, sentToken: token }),
        }
      );

      if (res.status == 403) {
        window.alert("Session Expired!");
      } else if (res.status == 500) {
        window.alert("Server Errors");
      } else if (res.status == 200) {
        window.alert("Password Changed");
        history.push("/signin");
      } else window.alert("Sserious Issues@");
    }
  };
  return (
    <div className="mt-5">
      <Container>
        <h3>Password Reset Page !</h3>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Enter New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button type="submit" onClick={ResetPassword}>
            Set Password
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
