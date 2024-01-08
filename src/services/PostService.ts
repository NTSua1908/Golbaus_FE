import { PostCreateModel } from "../model/postModel";
import api from "./api";

const BASE_URL_POST = "api/post/";

export function Create(createModel: PostCreateModel) {
  return api.post(BASE_URL_POST + "create", createModel);
}

export function Update(id: string, createModel: PostCreateModel) {
  return api.put(BASE_URL_POST + "update/" + id, createModel);
}

export function GetDetail(id: string) {
  return api.get(BASE_URL_POST + "GetDetail/" + id);
}

export function UpVote(id: string) {
  return api.put(BASE_URL_POST + "ToggleUpVote/" + id);
}

export function DownVote(id: string) {
  return api.put(BASE_URL_POST + "ToggleDownVote/" + id);
}

export function Delete(id: string) {
  return api.delete(BASE_URL_POST + "delete/" + id);
}
