import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";
import { PostCreateModel } from "../model/postModel";
import api from "./api";

const BASE_URL_POST = "post/";

export function Create(createModel: PostCreateModel) {
  return api.post(BASE_URL_POST + "create", createModel);
}

export function Update(id: string, updateModel: PostCreateModel) {
  return api.put(BASE_URL_POST + "update/" + id, updateModel);
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

export function IncreateView(id: string) {
  return api.put(BASE_URL_POST + "IncreaseView/" + id);
}

export function GetAllByToken(
  searchText: string | null,
  tags: string[],
  orderBy: OrderBy | null,
  orderType: OrderType | null,
  publishDateFrom: Date | null,
  publishDateTo: Date | null,
  page: number,
  amount: number
) {
  return api.get(BASE_URL_POST + "GetAllByToken", {
    params: {
      searchText,
      tags: tags.join(","),
      orderBy,
      orderType,
      publishDateFrom,
      publishDateTo,
      page,
      amount,
    },
  });
}

export function GetAllPost(
  searchText: string | null,
  tags: string[],
  orderBy: OrderBy | null,
  orderType: OrderType | null,
  publishDateFrom: Date | null,
  publishDateTo: Date | null,
  page: number,
  amount: number
) {
  return api.get(BASE_URL_POST + "GetAll", {
    params: {
      searchText,
      tags: tags.join(","),
      orderBy,
      orderType,
      publishDateFrom,
      publishDateTo,
      page,
      amount,
    },
  });
}

export function GetAllPostByUser(
  userId: string,
  searchText: string | null,
  tags: string[],
  orderBy: OrderBy | null,
  orderType: OrderType | null,
  publishDateFrom: Date | null,
  publishDateTo: Date | null,
  page: number,
  amount: number
) {
  return api.get(BASE_URL_POST + "GetAllByUser/" + userId, {
    params: {
      searchText,
      tags: tags.join(","),
      orderBy,
      orderType,
      publishDateFrom,
      publishDateTo,
      page,
      amount,
    },
  });
}

export function ToggleAddBookmark(id: string) {
  return api.put(BASE_URL_POST + "ToggleAddBookmark/" + id);
}

export function GetAllPostBookmarkByToken(
  searchText: string | null,
  tags: string[],
  orderBy: OrderBy | null,
  orderType: OrderType | null,
  publishDateFrom: Date | null,
  publishDateTo: Date | null,
  page: number,
  amount: number
) {
  return api.get(BASE_URL_POST + "GetAllBookmarkByToken", {
    params: {
      searchText,
      tags: tags.join(","),
      orderBy,
      orderType,
      publishDateFrom,
      publishDateTo,
      page,
      amount,
    },
  });
}
