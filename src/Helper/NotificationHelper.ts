import NotificationType from "../enums/NotificationType";

export const notificationLinkResolver = (
  issueId: string,
  notificationType: NotificationType
) => {
  switch (notificationType) {
    case NotificationType.AnswerQuestion:
      return "#";
    case NotificationType.CommentPost:
      return "#";
    case NotificationType.Reply:
      return "#";
    case NotificationType.NewPost:
      return "/post/" + issueId;
    case NotificationType.NewQuestion:
      return "/question/" + issueId;
    case NotificationType.Follow:
      return "/user/" + issueId;
    default:
      return "#";
  }
};
