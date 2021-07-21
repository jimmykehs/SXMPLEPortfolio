import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const Login = ({ setToken, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginUser(username, password) {
    try {
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section id="Login" className="Section">
      <h1>Login</h1>
      <p>{error}</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          axios.post("/api/admin", { username, password }).then(({ data }) => {
            if (data.token) {
              setToken(data.token);
              setLoggedIn(true);
              localStorage.setItem("SXMPLETOKEN", data.token);
              window.location.href = "/";
            } else {
              setError("Error logging in, please try again");
            }
          });
        }}
      >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Col>
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </section>
  );
};

export default Login;
