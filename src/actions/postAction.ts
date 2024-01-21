import { PostDetailModel } from "../model/postModel";

export const SET_POST_CONTENT = "SET_POST_CONTENT";
export const POST_NOT_FOUND = "POST_NOT_FOUND";
export const POST_LOADING = "POST_LOADING";
export const REMOVE_POST = "REMOVE_POST";
export const SET_POST_COMMENT_PAGE = "SET_POST_COMMENT_PAGE";

export const setPostContent = (post: PostDetailModel) => {
  return {
    type: SET_POST_CONTENT,
    payload: {
      post,
    },
  };
};

export const postLoading = () => {
  return {
    type: POST_LOADING,
  };
};

export const postNotFound = () => {
  return {
    type: POST_NOT_FOUND,
  };
};

export const removePost = () => {
  return {
    type: REMOVE_POST,
  };
};

export const setPostCommentPage = (page: number) => {
  return {
    type: SET_POST_COMMENT_PAGE,
    payload: {
      page,
    },
  };
};
