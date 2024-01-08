// LoginPage.tsx
import { Form, Input } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../Logo";
import "./forgotPassword.scss";

const ForgotPassword: React.FC = () => {
  const handleForgot = (values: any) => {
    console.log("Email/Password Login:", values);
  };

  const state = useLocation().state ?? { returnPath: null, id: null };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-logo">
          <Logo />
        </div>
        <h5 className="forgot-password-title">Forgot password</h5>
        <p className="forgot-password-description">
          Don't worry! Please provide us with the email you used to register
          your Golbaus account. We will send you a link to reset your password
          through that email.
        </p>
        <Form
          className="forgot-password-form"
          name="forgot-password"
          onFinish={handleForgot}
        >
          <label htmlFor="password">Your email</label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="forgot-password-form-function">
              <Link
                to={"/login"}
                state={{ returnPath: state.returnPath }}
                className="forgot-password-form-function-item"
              >
                Back to login
              </Link>
              <Link
                to={"/register"}
                state={{ returnPath: state.returnPath }}
                className="forgot-password-form-function-item"
              >
                Create account
              </Link>
            </div>
            <button className="forgot-password-form-submit" type="submit">
              Send me an email
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
