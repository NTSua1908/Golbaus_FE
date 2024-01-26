import { AxiosError } from "axios";

export const FetchingErrorHandler = (
  error: AxiosError,
  openNotificationFail: Function
) => {
  const errors = (error.response?.data as any)?.errors ?? undefined;
  if (errors) {
    const errorMessage = errors.join("\n") as string;
    openNotificationFail(errorMessage);
  } else {
    openNotificationFail("Something went wrong");
  }
};
