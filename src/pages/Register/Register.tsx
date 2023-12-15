import React from 'react';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './register.scss';
import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { validatePassword } from '../../Helper/InformationValidater';

interface RegisterFormProps {
  onRegister: (values: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const onFinish = (values: any) => {
    onRegister(values);
  };

  return (
    <Form
      className='register-form'
      name='register'
      onFinish={onFinish}>
      <label htmlFor='email'>Email</label>
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
          className='register-form-input'
          prefix={<UserOutlined />}
          placeholder='Email'
        />
      </Form.Item>
      <label htmlFor='password'>Password</label>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Please input your password!' },
          { validator: validatePassword },
        ]}
        hasFeedback>
        <Input.Password
          className='register-form-input'
          prefix={<LockOutlined />}
          placeholder='Password'
        />
      </Form.Item>
      <label htmlFor='confirm'>Confirm Password</label>
      <Form.Item
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}>
        <Input.Password
          className='register-form-input'
          prefix={<LockOutlined />}
          placeholder='Confirm password'
        />
      </Form.Item>
      <label htmlFor='fullname'>Full name</label>
      <Form.Item
        name='fullname'
        rules={[{ required: true, message: 'Please input your fullname!' }]}
        hasFeedback>
        <Input
          className='register-form-input'
          prefix={<UserOutlined />}
          placeholder='Full name'
        />
      </Form.Item>
      <label htmlFor='username'>User name</label>
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your user name!' }]}
        hasFeedback>
        <Input
          className='register-form-input'
          prefix={<UserOutlined />}
          placeholder='User name'
        />
      </Form.Item>
      <Form.Item>
        <div className='register-form-function'>
          <Link
            to={'/login'}
            className='register-form-function-item'>
            Already have account?
          </Link>
        </div>
        <button
          className='register-form-submit'
          type='submit'>
          Register
        </button>
      </Form.Item>
    </Form>
  );
};

const Register: React.FC = () => {
  const handleRegister = (values: any) => {
    // Implement your email/password register logic here
    console.log('Email/Password register:', values);
  };

  const handleGoogleLogin = () => {
    // Implement your Google register logic here
    // You may use a library like Firebase for Google authentication
    message.info('Google register clicked');
  };

  const handleFacebookLogin = () => {
    // Implement your Google register logic here
    // You may use a library like Firebase for Google authentication
    message.info('Google register clicked');
  };

  return (
    <div className='register'>
      <div className='register-container'>
        <div className='register-logo'>
          <Logo />
        </div>
        <h5 className='register-title'>Register Golbaus</h5>
        <RegisterForm onRegister={handleRegister} />
        <div className='register-other'>
          <hr />
          <span className='mx-3'>Sign in with</span>
          <hr />
        </div>
        <div className='register-other-function'>
          <button
            className='register-other-function-google'
            onClick={handleGoogleLogin}>
            <FaGoogle style={{ color: '#e94820' }} />
            <span>Google</span>
          </button>
          <div className='register-other-function-devider'></div>
          <button
            className='register-other-function-facebook'
            onClick={handleFacebookLogin}>
            <FaFacebook style={{ color: '#3b5998' }} />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
