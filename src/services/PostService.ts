import { PostCreateModel } from "../model/postModel";
import api from "./api";

const BASE_URL_POST = "api/post/";

export function Create(createModel: PostCreateModel) {
  return api.post(BASE_URL_POST + "create", createModel);
}

export function GetDetail(id: string) {
  return api.get(BASE_URL_POST + "GetDetail/" + id);
}
