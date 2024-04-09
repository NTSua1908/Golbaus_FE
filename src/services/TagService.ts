import api from "./api";

const BASE_URL_TAG = "api/tag/";

export function GetAllTags(searchText: string, page: number, amount: number) {
  return api.get(BASE_URL_TAG + "GetAll", {
    params: {
      searchText,
      page,
      amount,
    },
  });
}
