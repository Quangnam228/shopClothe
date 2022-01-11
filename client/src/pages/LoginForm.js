import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function LoginForm() {
  // const onChangeLogin = (e) => {
  //   return;
  // };

  // const login = async (e) => {
  //   e.preventDefault();
  //   return;
  // };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className="input-login"
                required
                // value={username}
                // onChange={onChangeLogin}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                className="input-login"
                required
                // value={password}
                // onChange={onChangeLogin}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
            <div className="LoginButtonRegister">
              <p>Don't have an account?</p>
              {/* <Link to="/register"> */}
              <Button variant="info" size="sm" className="ml-2">
                Register
              </Button>
              {/* </Link> */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
