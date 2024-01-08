import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { validatePassword } from "../../Helper/InformationValidater";
import { Logo } from "../../Logo";
import "./register.scss";

interface RegisterFormProps {
  onRegister: (values: any) => void;
  returnPath?: string;
  id?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  returnPath,
}) => {
  const onFinish = (values: any) => {
    onRegister(values);
  };

  return (
    <Form className='register-form' name='register' onFinish={onFinish}>
      <label htmlFor='email'>Email</label>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input
          className='register-form-input'
          prefix={<MailOutlined />}
          placeholder='Email'
        />
      </Form.Item>
      <label htmlFor='password'>Password</label>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: "Please input your password!" },
          { validator: validatePassword },
        ]}
        hasFeedback
      >
        <Input.Password
          className='register-form-input'
          prefix={<LockOutlined />}
          placeholder='Password'
        />
      </Form.Item>
      <label htmlFor='confirm'>Confirm Password</label>
      <Form.Item
        name='confirm'
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          className='register-form-input'
          prefix={<LockOutlined />}
          placeholder='Confirm password'
        />
      </Form.Item>
      <label htmlFor='fullname'>Full name</label>
      <Form.Item
        name='fullname'
        rules={[{ required: true, message: "Please input your fullname!" }]}
        hasFeedback
      >
        <Input
          className='register-form-input'
          prefix={<UserOutlined />}
          placeholder='Full name'
        />
      </Form.Item>
      <label htmlFor='username'>User name</label>
      <Form.Item
        name='username'
        rules={[{ required: true, message: "Please input your user name!" }]}
        hasFeedback
      >
        <Input
          className='register-form-input'
          prefix={<UserOutlined />}
          placeholder='User name'
        />
      </Form.Item>
      <Form.Item>
        <div className='register-form-function'>
          <Link
            to={"/login"}
            state={{ returnPath }}
            className='register-form-function-item'
          >
            Already have account?
          </Link>
        </div>
        <button className='register-form-submit' type='submit'>
          Register
        </button>
      </Form.Item>
    </Form>
  );
};

const Register: React.FC = () => {
  const handleRegister = (values: any) => {
    console.log("Email/Password register:", values);
  };

  const handleGoogleLogin = () => {
    message.info("Google register clicked");
  };

  const handleFacebookLogin = () => {
    message.info("Google register clicked");
  };

  const state = useLocation().state ?? { returnPath: null, id: null };

  return (
    <div className='register'>
      <div className='register-container'>
        <div className='register-logo'>
          <Logo />
        </div>
        <h5 className='register-title'>Register Golbaus</h5>
        <RegisterForm
          onRegister={handleRegister}
          returnPath={state.returnPath}
        />
        <div className='register-other'>
          <hr />
          <span className='mx-3'>Sign in with</span>
          <hr />
        </div>
        <div className='register-other-function'>
          <button
            className='register-other-function-google'
            onClick={handleGoogleLogin}
          >
            <FaGoogle style={{ color: "#e94820" }} />
            <span>Google</span>
          </button>
          <div className='register-other-function-devider'></div>
          <button
            className='register-other-function-facebook'
            onClick={handleFacebookLogin}
          >
            <FaFacebook style={{ color: "#3b5998" }} />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
