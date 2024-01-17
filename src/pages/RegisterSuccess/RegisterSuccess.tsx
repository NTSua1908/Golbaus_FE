import React, { useEffect, useState } from "react";
import EmailPNG from "../../images/email2.png";
import "./registerSuccess.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ResendVerifyEmail, VerifyEmail } from "../../services/AuthService";
import { AxiosError } from "axios";
import { notification } from "antd";
import { FaChevronLeft } from "react-icons/fa";
import { validateEmail } from "../../Helper/InformationValidater";

function RegisterSuccess() {
  const [email, setEmail] = useState(useLocation().state?.email ?? "");
  const { emailResend } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleResendVerifyEmail = async () => {
    await ResendVerifyEmail(email)
      .then((res) => {
        openNotificationSuccess("Resend verification email successfully");
      })
      .catch((error: AxiosError) => {
        const errors = (error.response?.data as any).errors;
        const errorMessage = errors.join("\n") as string;
        openNotificationFailure(errorMessage);
      });
  };

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

  const isEmailValid = emailResend && validateEmail(email);

  useEffect(() => {
    if (isEmailValid) {
      setEmail(emailResend);
      ResendVerifyEmail(emailResend)
        .then((res) => {
          openNotificationSuccess("Resend verification email successfully");
        })
        .catch((error: AxiosError) => {
          const errors = (error.response?.data as any).errors;
          const errorMessage = errors.join("\n") as string;
          openNotificationFailure(errorMessage);
        });
    }
  }, []);

  console.log(email, "- ", emailResend, !emailResend && email === "");

  return (
    <div className='registerSuccess'>
      {contextHolder}
      <div className='registerSuccess-container'>
        {((!emailResend && email !== "") || isEmailValid) && (
          <div className='registerSuccess-content'>
            <div className='registerSuccess-img'>
              <img src={EmailPNG} alt='' />
            </div>
            <div className='registerSuccess-title'>Check email</div>
            <div className='registerSuccess-message'>
              <p>
                Please check your email inbox and click on the provided link to
                verify your email. If you don't receive email,{" "}
                <span onClick={handleResendVerifyEmail}>
                  click here to resend.
                </span>
              </p>
            </div>
            <div
              className='registerSuccess-button'
              onClick={() => {
                navigate("/login");
              }}
            >
              <FaChevronLeft style={{ marginRight: "10px" }} /> Back to login
            </div>
          </div>
        )}
        {((!emailResend && email === "") || (emailResend && !isEmailValid)) && (
          <div className='registerSuccess-invalid'>Invalid activation link</div>
        )}
      </div>
    </div>
  );
}

export default RegisterSuccess;
