// import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function RegisterForm() {
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
                // onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className="input-login"
                required
                // value={password}
                // onChange={onChangeRegister}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="input-login"
                required
                // value={confirmPassword}
                // onChange={onChangeRegister}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
            <div className="LoginButtonRegister">
              <p>Already have an account?</p>
              {/* <Link to="/login"> */}
              <Button variant="info" size="sm" className="ml-2">
                Login
              </Button>
              {/* </Link> */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
