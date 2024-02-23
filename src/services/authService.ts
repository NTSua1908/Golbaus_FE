import Token from "markdown-it/lib/token";
import { LoginModel, ResetPasswordModel } from "../model/authModel";
import api from "./api";
import axios from "axios";

const BASE_URL_AUTH = "auth/";

export function Login(params: LoginModel) {
  return api.post(BASE_URL_AUTH + "login", params);
}

export function Logout() {
  return api.delete(BASE_URL_AUTH + "logout");
}

export function VerifyEmail(email: string, token: string) {
  return api.get(BASE_URL_AUTH + `ConfirmEmail/${email}/${token}`);
}

export function ResendVerifyEmail(email: string) {
  return api.get(BASE_URL_AUTH + `ResendConfirmEmail/${email}`);
}

export function SendEmailResetPassword(email: string) {
  return api.get(BASE_URL_AUTH + `SendEmailResetPassword/${email}`);
}

export function ResetPassword(model: ResetPasswordModel) {
  return api.put(BASE_URL_AUTH + "ResetPassword", model);
}

export function getGoogleAccountInfo(token: string) {
  console.log("Token: ", token);
  return axios.get(
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
    {
      headers: {
        Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
      },
    }
  );
}
