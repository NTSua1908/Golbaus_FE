import { UserGetByToken } from "../model/accountModel";

export const SET_BASE_INFO = "SET_BASE_INFO";
export const REMOVE_BASE_INFO = "REMOVE_BASE_INFO";
export const UPDATE_AVATAR = "UPDATE_AVATAR";

export const setBaseInfo = (user: UserGetByToken) => {
  return {
    type: SET_BASE_INFO,
    payload: user,
  };
};

export const removeBaseInfo = () => {
  return {
    type: SET_BASE_INFO,
    payload: null,
  };
};

export const updateAvatar = (avatar: string) => {
  return {
    type: UPDATE_AVATAR,
    payload: {
      avatar,
    },
  };
};
