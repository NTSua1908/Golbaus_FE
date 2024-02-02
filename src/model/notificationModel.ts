import { Dayjs } from "dayjs";
import OrderType from "../enums/OrderType";
import NotificationType from "../enums/NotificationType";

export interface NotificationModel {
  id: string;
  content: string;
  type: NotificationType;
  createdDate: Date;
  isRead: boolean;
  issueId: string;
  userId: string;
  avatar: string;
  userName: string;
}

export interface NotificationFilter {
  unRead: boolean;
  orderType: OrderType | null;
  notificationDateFrom: Dayjs | null;
  notificationDateTo: Dayjs | null;
  types: NotificationType[];
}
