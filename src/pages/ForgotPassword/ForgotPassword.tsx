// LoginPage.tsx
import React from 'react';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './forgotPassword.scss';
import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import FormItem from 'antd/es/form/FormItem';

const validatePassword = (_: any, value: any) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!value || regex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(
    'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  );
};

const ForgotPassword: React.FC = () => {
  const handleForgot = (values: any) => {
    // Implement your email/password login logic here
    console.log('Email/Password Login:', values);
  };

  return (
    <div className='forgot-password'>
      <div className='forgot-password-container'>
        <div className='forgot-password-logo'>
          <Logo />
        </div>
        <h5 className='forgot-password-title'>Forgot password</h5>
        <p className='forgot-password-description'>
          Don't worry! Please provide us with the email you used to register
          your Viblo account. We will send you a link to reset your password
          through that email.
        </p>
        <Form
          className='forgot-password-form'
          name='forgot-password'
          onFinish={handleForgot}>
          <label htmlFor='password'>Your email</label>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item>
            <div className='forgot-password-form-function'>
              <Link
                to={'/login'}
                className='forgot-password-form-function-item'>
                Back to login
              </Link>
              <Link
                to={'/register'}
                className='forgot-password-form-function-item'>
                Create account
              </Link>
            </div>
            <button
              className='forgot-password-form-submit'
              type='submit'>
              Send me an email
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
