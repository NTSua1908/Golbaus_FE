import {
  RegisterModel,
  UserGetByToken,
  UserUpdateByTokenModel,
} from "./../model/accountModel";
import api from "./api";

const BASE_URL_ACCOUNT = "account/";

export function GetByToken() {
  return api.get(BASE_URL_ACCOUNT + "getByToken");
}

export function GetDetailByToken() {
  return api.get(BASE_URL_ACCOUNT + "GetDetailByToken");
}

export function GetDetailById(userId: string) {
  return api.get(BASE_URL_ACCOUNT + "GetDetailById/" + userId);
}

export function RegisterAccount(model: RegisterModel) {
  return api.post(BASE_URL_ACCOUNT + "CreateUser", model);
}

export function UpdateUserByToken(model: UserUpdateByTokenModel) {
  return api.put(BASE_URL_ACCOUNT + "UpdateByToken", model);
}

export function UpdateAvatarByToken(avatar: string) {
  return api.put(BASE_URL_ACCOUNT + "UpdateAvatarByToken", { avatar });
}

export function ToggleFollow(userId: string) {
  return api.put(BASE_URL_ACCOUNT + "ToggleFollow/" + userId);
}
