import { RegisterModel, UserGetByToken } from "./../model/accountModel";
import api from "./api";

const BASE_URL_ACCOUNT = "account/";

export function GetByToken() {
  return api.get(BASE_URL_ACCOUNT + "getByToken");
}

export function RegisterAccount(model: RegisterModel) {
  return api.post(BASE_URL_ACCOUNT + "CreateUser", model);
}
