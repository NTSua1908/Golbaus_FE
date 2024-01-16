import { Dayjs } from "dayjs";
import VoteType from "../enums/VoteType";

export interface CommentCreateModel {
  content: string;
  replyFor: string;
  parentId: string | null;
  postId: string;
}

export interface CommentDetailModel {
  id: string;
  avatar: string;
  fullName: string;
  userName: string;
  content: string;
  replyFor: string;
  upVote: number;
  downVote: number;
  replyCount: number;
  voteType: VoteType;
  createdDate: Date;
  updatedDate: Date;
  isMyComment: boolean;
  replies: CommentDetailModel[];
}

export interface CommentUpdateModel {
  content: string;
}
