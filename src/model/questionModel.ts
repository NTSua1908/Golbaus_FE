import VoteType from "../enums/VoteType";

export interface QuestionListModel {
  id: string;
  title: string;
  avatar: string;
  fullName: string;
  followCount: number;
  date: Date;
  viewCount: number;
  commentCount: number;
  tags: string[];
}

export interface QuestionDetailModel {
  title: string;
  content: string;
  avatar: string;
  fullName: string;
  userName: string;
  followCount: number;
  date: Date;
  viewCount: number;
  commentCount: number;
  questionCount: number;
  tags: string[];
  vote: VoteType;
  voteCount: number;
  isMyQuestion: boolean;
}
