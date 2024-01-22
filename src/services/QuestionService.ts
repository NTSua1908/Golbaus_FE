import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";
import { QuestionCreateUpdateModel } from "../model/questionModel";
import api from "./api";

const BASE_URL_QUESTION = "question/";

export function Create(createModel: QuestionCreateUpdateModel) {
  return api.post(BASE_URL_QUESTION + "create", createModel);
}

export function Update(id: string, updateModel: QuestionCreateUpdateModel) {
  return api.put(BASE_URL_QUESTION + "update/" + id, updateModel);
}

export function GetDetail(id: string) {
  return api.get(BASE_URL_QUESTION + "GetDetail/" + id);
}

export function UpVote(id: string) {
  return api.put(BASE_URL_QUESTION + "ToggleUpVote/" + id);
}

export function DownVote(id: string) {
  return api.put(BASE_URL_QUESTION + "ToggleDownVote/" + id);
}

export function Delete(id: string) {
  return api.delete(BASE_URL_QUESTION + "delete/" + id);
}

export function IncreateView(id: string) {
  return api.put(BASE_URL_QUESTION + "IncreaseView/" + id);
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
  return api.get(BASE_URL_QUESTION + "GetAllByToken", {
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
  return api.get(BASE_URL_QUESTION + "GetAll", {
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
