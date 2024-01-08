import { Logo } from "../../Logo";
import { IoClose } from "react-icons/io5";
import "./requiredLogin.scss";
import { Link } from "react-router-dom";

interface RequiredLoginProps {
  handleClose: () => void;
  show: boolean;
}

function RequiredLogin({ handleClose, show }: RequiredLoginProps) {
  return (
    <div className={`RequiredLogin ${show && "show"}`}>
      <div className="RequiredLogin-background" onClick={handleClose}></div>
      <div className="RequiredLogin-container">
        <div className="RequiredLogin-close" onClick={handleClose}>
          <IoClose />
        </div>
        <div className="RequiredLogin-logo">
          <Logo />
        </div>
        <p className="RequiredLogin-message">
          Please log in to interact and engage with the community. If you don't
          have an account, you can sign up for free
        </p>
        <div className="RequiredLogin-function">
          <div className="RequiredLogin-function-button">
            <Link
              to={"/login"}
              state={{
                returnPath: window.location.pathname,
              }}
            >
              Login
            </Link>
          </div>
          <div className="RequiredLogin-function-button">
            <Link
              to={"/register"}
              state={{
                returnPath: window.location.pathname,
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequiredLogin;
