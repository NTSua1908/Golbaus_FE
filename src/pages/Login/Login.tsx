// LoginPage.tsx
import React from 'react';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (values: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const onFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <Form
      className='login-form'
      name='login'
      onFinish={onFinish}>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input
          className='login-form-input'
          prefix={<UserOutlined />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password
          className='login-form-input'
          prefix={<LockOutlined />}
          placeholder='Password'
        />
        <div className='login-form-function'>
          <Link
            to={'/forgot-password'}
            className='login-form-function-item'>
            Forgot password?
          </Link>
          <Link
            to={'register'}
            className='login-form-function-item'>
            Create account
          </Link>
        </div>
      </Form.Item>
      <Form.Item>
        <button
          className='login-form-submit'
          type='submit'>
          Login
        </button>
      </Form.Item>
    </Form>
  );
};

const Login: React.FC = () => {
  const handleLogin = (values: any) => {
    // Implement your email/password login logic here
    console.log('Email/Password Login:', values);
  };

  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    // You may use a library like Firebase for Google authentication
    message.info('Google login clicked');
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='login-logo'>
          <Logo />
        </div>
        <h5 className='login-title'>Login Golbaus</h5>
        <LoginForm onLogin={handleLogin} />
        <div className='login-other'>
          <hr />
          <span className='mx-3'>Login by</span>
          <hr />
        </div>
        <button
          className='login-other-google'
          onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
