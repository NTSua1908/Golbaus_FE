import VoteType from "../enums/VoteType";

export interface QuestionCreateUpdateModel {
  title: string;
  content: string;
  tags: string[];
}

export interface QuestionListModel {
  id: string;
  title: string;
  avatar: string;
  userName: string;
  followCount: number;
  viewCount: number;
  answerCount: number;
  tags: string[];
  updatedDate: Date | null;
  createdDate: Date;
}

export interface QuestionDetailModel {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  avatar: string;
  fullName: string;
  userName: string;
  vote: VoteType;
  followCount: number;
  viewCount: number;
  answerCount: number;
  questionCount: number;
  voteCount: number;
  isMyQuestion: boolean;
  isFollowing: boolean;
  updatedDate: Date | null;
  createdDate: Date;
  isMarked: boolean;
}
