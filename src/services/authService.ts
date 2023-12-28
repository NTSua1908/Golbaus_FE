import { LoginModel } from "../model/authModel";
import api from "./api";

const BASE_URL_AUTH = "api/auth/";

export function Login(params: LoginModel) {
  return api.post(BASE_URL_AUTH + "login", params);
}

export function Logout() {
  return api.delete(BASE_URL_AUTH + "logout");
}
