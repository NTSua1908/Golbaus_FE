import React from 'react';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import FormItem from 'antd/es/form/FormItem';

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
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
        hasFeedback>
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
      </Form.Item>
      <Form.Item>
        <div className='login-form-function'>
          <Link
            to={'/forgot-password'}
            className='login-form-function-item'>
            Forgot password?
          </Link>
          <Link
            to={'/register'}
            className='login-form-function-item'>
            Create account
          </Link>
        </div>
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

  const handleFacebookLogin = () => {
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
          <span className='mx-3'>Sign in with</span>
          <hr />
        </div>
        <div className='login-other-function'>
          <button
            className='login-other-function-google'
            onClick={handleGoogleLogin}>
            <FaGoogle style={{ color: '#e94820' }} />
            <span>Google</span>
          </button>
          <div className='login-other-function-devider'></div>
          <button
            className='login-other-function-facebook'
            onClick={handleFacebookLogin}>
            <FaFacebook style={{ color: '#3b5998' }} />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
