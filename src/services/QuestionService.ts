import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";
import { QuestionCreateUpdateModel } from "../model/questionModel";
import api from "./api";

const BASE_URL_QUESTION = "api/question/";

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

export function GetAllQuestion(
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

export function GetAllByQuestionUser(
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
  return api.get(BASE_URL_QUESTION + "GetAllByUser/" + userId, {
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
  return api.put(BASE_URL_QUESTION + "ToggleAddBookmark/" + id);
}

export function GetAllQuestionBookmarkByToken(
  searchText: string | null,
  tags: string[],
  orderBy: OrderBy | null,
  orderType: OrderType | null,
  publishDateFrom: Date | null,
  publishDateTo: Date | null,
  page: number,
  amount: number
) {
  return api.get(BASE_URL_QUESTION + "GetAllBookmarkByToken", {
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

export function GetRelatedQuestion(
  questionId: string,
  tags: string[],
  page: number,
  amount: number
) {
  const queryString = tags
    .map((value) => `tags=${encodeURIComponent(value)}`)
    .join("&");
  return api.get(
    BASE_URL_QUESTION + `GetRelatedQuestion/${questionId}?${queryString}`,
    {
      params: {
        page,
        amount,
      },
    }
  );
}

export function GetNewestQuestion(page: number, amount: number) {
  return api.get(BASE_URL_QUESTION + "GetNewestQuestion", {
    params: {
      page,
      amount,
    },
  });
}

export function GetFeaturedQuestionByToken(page: number, amount: number) {
  return api.get(BASE_URL_QUESTION + "GetFeaturedQuestionByToken", {
    params: {
      page,
      amount,
    },
  });
}

export function GetFollowUserQuestion(page: number, amount: number) {
  return api.get(BASE_URL_QUESTION + "GetFollowUserQuestion", {
    params: {
      page,
      amount,
    },
  });
}
