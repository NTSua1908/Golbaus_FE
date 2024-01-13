import { Dayjs } from "dayjs";
import OrderType from "../enums/OrderType";
import NotificationType from "../enums/NotificationType";

export interface NotificationModel {
  user: string;
  userId: string;
  avatar: string;
  content: string;
  date: Date;
  link: string;
  isRead: boolean;
}

export interface NotificationFilter {
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  notificationType: NotificationType[] | null;
  orderType: OrderType | null;
  isRead: boolean | null;
}
