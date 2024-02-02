import NotificationType from "../enums/NotificationType";
import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";
import { QuestionCreateUpdateModel } from "../model/questionModel";
import api from "./api";

const BASE_URL_NOTIFICATION = "notification/";

interface NotifcationRequestPayload {
  unRead: boolean;
  orderType: OrderType | null;
  notificationDateFrom: Date | null;
  notificationDateTo: Date | null;
  types: NotificationType[];
  page: number;
  amount: number;
}

export function GetAllNotificationByToken(
  unRead: boolean,
  orderType: OrderType | null,
  notificationDateFrom: Date | null,
  notificationDateTo: Date | null,
  types: NotificationType[],
  page: number,
  amount: number
) {
  const payload: NotifcationRequestPayload = {
    unRead,
    orderType,
    notificationDateFrom,
    notificationDateTo,
    types,
    page,
    amount,
  };

  const queryString = types.map((value) => `types=${value}`).join("&");

  return api.get(BASE_URL_NOTIFICATION + "GetAllByToken?" + queryString, {
    params: {
      unRead,
      orderType,
      notificationDateFrom,
      notificationDateTo,
      page,
      amount,
    },
  });
}

export function MarkAllRead() {
  return api.put(BASE_URL_NOTIFICATION + "MarkAllRead");
}

export function MarkRead(id: string) {
  return api.put(BASE_URL_NOTIFICATION + "MarkRead/" + id);
}

export function MarkUnread(id: string) {
  return api.put(BASE_URL_NOTIFICATION + "MarkUnread/" + id);
}

export function Delete(id: string) {
  return api.put(BASE_URL_NOTIFICATION + "Delete/" + id);
}
