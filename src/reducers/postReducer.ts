import {
  POST_LOADING,
  POST_NOT_FOUND,
  REMOVE_POST,
  SET_POST_COMMENT_PAGE,
  SET_POST_CONTENT,
} from "../actions/postAction";
import { PostDetailModel } from "../model/postModel";
import { CommentDetailModel } from "./../model/commentModel";

interface PostState {
  post: PostDetailModel | null;
  comments: CommentDetailModel[];
  isNotFound: boolean;
  isLoading: boolean;
  isCommentLoading: boolean;
  page: number;
}

const initPostState: PostState = {
  post: null,
  comments: [],
  isNotFound: false,
  isLoading: false,
  isCommentLoading: false,
  page: 0,
};

interface PostAction {
  type: string;
  payload: PostState | null;
}

const postReducer = (state = initPostState, action: PostAction) => {
  switch (action.type) {
    case SET_POST_CONTENT:
      return {
        ...state,
        post: action.payload?.post,
        isNotFound: false,
        isLoading: false,
        page: 0,
      };
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
        isNotFound: false,
      };
    case POST_NOT_FOUND:
      return {
        ...state,
        post: null,
        comments: [],
        isNotFound: true,
        isLoading: false,
        page: 0,
      };
    case REMOVE_POST:
      return {
        ...state,
        post: null,
        comments: [],
        isNotFound: false,
        isLoading: false,
        page: 0,
      };
    case SET_POST_COMMENT_PAGE:
      return {
        ...state,
        page: action.payload?.page,
      };
    default:
      return state;
  }
};

export default postReducer;
