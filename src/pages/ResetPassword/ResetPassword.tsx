// LoginPage.tsx
import { Form, Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logo } from "../../Logo";
import "./resetPassword.scss";
import {
  validateEmail,
  validatePassword,
} from "../../Helper/InformationValidater";
import { ResetPassword as Reset } from "../../services/AuthService";
import { ResetPasswordModel } from "../../model/authModel";
import { AxiosError } from "axios";

interface ResetPasswordFormProps {
  onResetPassword: (values: any) => void;
  loading: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onResetPassword,
  loading,
}) => {
  const onFinish = (values: any) => {
    onResetPassword(values);
  };

  return (
    <Form
      className='reset-password-form'
      name='reset-password'
      onFinish={onFinish}
    >
      <label htmlFor='password'>Password</label>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { validator: validatePassword },
        ]}
        hasFeedback
      >
        <Input.Password name='password' />
      </Form.Item>

      <label htmlFor='confirm'>Confirm Password</label>
      <Form.Item
        name='confirmPassword'
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
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className='reset-password-form-function'>
          <Link to={"/login"} className='reset-password-form-function-item'>
            Back to login
          </Link>
          <Link to={"/register"} className='reset-password-form-function-item'>
            Create account
          </Link>
        </div>
        <button className='reset-password-form-submit' type='submit'>
          Reset password{" "}
          {loading && <Spin className='reset-password-form-submit-spin' />}
        </button>
      </Form.Item>
    </Form>
  );
};

const ResetPassword: React.FC = () => {
  const { email } = useParams();
  const { token } = useParams();

  const isValid = email && validateEmail(email) && token && token.length > 0;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationSuccess = (message: string) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  const handleReset = (values: any) => {
    if (isValid) {
      setLoading(true);
      const resetData: ResetPasswordModel = {
        email: email,
        token: token,
        password: values.password,
      };
      Reset(resetData)
        .then((res) => {
          openNotificationSuccess("Password reset successful.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error: AxiosError) => {
          const errors = (error.response?.data as any).errors;
          if (errors) {
            const errorMessage = errors.join("\n") as string;
            openNotificationFailure(errorMessage);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className='reset-password'>
      {contextHolder}
      <div className='reset-password-container'>
        {isValid && (
          <>
            <div className='reset-password-logo'>
              <Logo />
            </div>
            <h5 className='reset-password-title'>Reset password</h5>
            <ResetPasswordForm
              onResetPassword={handleReset}
              loading={loading}
            />
          </>
        )}
        {!isValid && (
          <div className='registerSuccess-invalid'>
            Invalid reset password link
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
