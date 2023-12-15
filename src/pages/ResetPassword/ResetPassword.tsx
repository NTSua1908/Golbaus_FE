// LoginPage.tsx
import { Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../Logo';
import './resetPassword.scss';
import { validatePassword } from '../../Helper/InformationValidater';

interface ResetPasswordFormProps {
  onResetPassword: (values: any) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onResetPassword,
}) => {
  const onFinish = (values: any) => {
    onResetPassword(values);
  };

  return (
    <Form
      className='reset-password-form'
      name='reset-password'
      onFinish={onFinish}>
      <label htmlFor='password'>Password</label>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          { validator: validatePassword },
        ]}
        hasFeedback>
        <Input.Password name='password' />
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
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className='reset-password-form-function'>
          <Link
            to={'/login'}
            className='reset-password-form-function-item'>
            Back to login
          </Link>
          <Link
            to={'/register'}
            className='reset-password-form-function-item'>
            Create account
          </Link>
        </div>
        <button
          className='reset-password-form-submit'
          type='submit'>
          Reset password
        </button>
      </Form.Item>
    </Form>
  );
};

const ResetPassword: React.FC = () => {
  const handleReset = (values: any) => {
    // Implement your email/password login logic here
    console.log('Email/Password Login:', values);
  };

  return (
    <div className='reset-password'>
      <div className='reset-password-container'>
        <div className='reset-password-logo'>
          <Logo />
        </div>
        <h5 className='reset-password-title'>Reset password</h5>
        <ResetPasswordForm onResetPassword={handleReset} />
      </div>
    </div>
  );
};

export default ResetPassword;
