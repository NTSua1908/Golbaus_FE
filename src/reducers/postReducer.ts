import { Comment } from "./../model/commentModel";
import { PostDetailModel } from "../model/postModel";
import {
  POST_LOADING,
  POST_NOT_FOUND,
  REMOVE_POST,
  SET_POST_CONTENT,
  SET_POST_COMMENTS,
} from "../actions/postAction";

interface PostState {
  post: PostDetailModel | null;
  comments: Comment[];
  isNotFound: boolean;
  isLoading: boolean;
}

const initPostState: PostState = {
  post: null,
  comments: [],
  isNotFound: false,
  isLoading: false,
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
      };
    case SET_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload?.comments,
        isNotFound: false,
        isLoading: false,
      };
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
        isNotFound: false,
      };
    case POST_NOT_FOUND:
      return {
        post: null,
        comments: [],
        isNotFound: true,
        isLoading: false,
      };
    case REMOVE_POST:
      return {
        post: null,
        comments: [],
        isNotFound: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
