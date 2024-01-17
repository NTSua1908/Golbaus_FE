import {
  CommentCreateModel,
  CommentUpdateModel,
} from "./../model/commentModel";
import api from "./api";

const BASE_URL_COMMENT = "comment/";

export function AddPostComment(model: CommentCreateModel) {
  return api.post(BASE_URL_COMMENT + "CreateCommentPost", model);
}

export function UpdatePostComment(id: string, model: CommentUpdateModel) {
  return api.put(BASE_URL_COMMENT + "Update/Post/" + id, model);
}

export function GetPostComment(
  postId: string,
  page: number = 0,
  amount: number = 10
) {
  return api.get(BASE_URL_COMMENT + "getAll/post/" + postId, {
    params: {
      page,
      amount,
    },
  });
}

export function GetPostCommentReply(
  postId: string,
  commentId: string,
  page: number = 0,
  amount: number = 10
) {
  return api.get(
    BASE_URL_COMMENT + `GetAll/Post/Reply/${postId}/${commentId}`,
    {
      params: {
        page,
        amount,
      },
    }
  );
}

export function DeletePostComment(commentId: string) {
  return api.delete(BASE_URL_COMMENT + `Delete/PostComment/${commentId}`);
}

export function UpVotePostComment(id: string) {
  return api.put(BASE_URL_COMMENT + "ToggleUpVotePostComment/" + id);
}

export function DownVotePostComment(id: string) {
  return api.put(BASE_URL_COMMENT + "ToggleDownVotePostComment/" + id);
}
