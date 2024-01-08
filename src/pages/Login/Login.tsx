import React, { useEffect } from "react";
import { Spin, message } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";
import { Logo } from "../../Logo";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Login as HandleLogin } from "../../services/AuthService";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../actions/loginAction";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onLogin: (values: any) => void;
  returnPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, returnPath }) => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <Form className="login-form" name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
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
          className="login-form-input"
          prefix={<UserOutlined />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          className="login-form-input"
          prefix={<LockOutlined />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <div className="login-form-function">
          <Link
            to={"/forgot-password"}
            state={{ returnPath }}
            className="login-form-function-item"
          >
            Forgot password?
          </Link>
          <Link
            to={"/register"}
            state={{ returnPath }}
            className="login-form-function-item"
          >
            Create account
          </Link>
        </div>
        <button className="login-form-submit" type="submit">
          Login{isLoading && <Spin className="login-form-submit-spin" />}
        </button>
      </Form.Item>
    </Form>
  );
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  const state = useLocation().state ?? { returnPath: null };

  useEffect(() => {
    console.log("login", state.returnPath, state.id);
    if (isAuthenticated) {
      if (state && state.returnPath) {
        navigate(state.returnPath);
      } else {
        navigate("/");
      }
    }
  }, []);

  const handleLogin = (values: any) => {
    if (!isLoading) {
      dispatch(loginStart());
      HandleLogin({ email: values.email, password: values.password })
        .then((res: any) => {
          localStorage.setItem("token", res.data.token.access_token);
          openNotificationSuccess();
          dispatch(loginSuccess());
          setTimeout(() => {
            if (state && state.returnPath) {
              navigate(state.returnPath, { state: { isReload: true } });
            } else {
              navigate("/");
            }
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch(loginFailure());
          openNotificationFailure();
        });
    }
  };

  const handleGoogleLogin = () => {
    message.info("Google login clicked");
  };

  const handleFacebookLogin = () => {
    message.info("Facebook login clicked");
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Login successful",
      placement: "topRight",
    });
  };

  const openNotificationFailure = () => {
    api.error({
      message: `Notification`,
      description: "Login failure (Username or password is incorrect)",
      placement: "topRight",
      type: "error",
    });
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="login-container">
        <div className="login-logo">
          <Logo />
        </div>
        <h5 className="login-title">Login Golbaus</h5>
        <LoginForm onLogin={handleLogin} returnPath={state.returnPath} />
        <div className="login-other">
          <hr />
          <span className="mx-3">Sign in with</span>
          <hr />
        </div>
        <div className="login-other-function">
          <button
            className="login-other-function-google"
            onClick={handleGoogleLogin}
          >
            <FaGoogle style={{ color: "#e94820" }} />
            <span>Google</span>
          </button>
          <div className="login-other-function-devider"></div>
          <button
            className="login-other-function-facebook"
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

export default Login;
