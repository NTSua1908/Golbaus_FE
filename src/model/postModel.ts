import { Dayjs } from "dayjs";
import PublishType from "../enums/PublishType";
import VoteType from "../enums/VoteType";
import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";

export interface PostBlock {
  thumbnail: string;
  title: string;
  excerpt: string;
  author: string;
  date: Date;
  id: string;
}

export interface PostList {
  thumbnail: string;
  title: string;
  excerpt: string;
  upvote: number;
  downvote: number;
  viewCount: number;
  authorName: string;
  authorAvatar: string;
  commentCount: number;
  date: Date;
  id: string;
}

export interface PostCreateModel {
  title: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  content: string;
  publishType: PublishType;
}

export interface PostDetailModel {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  content: string;
  countVote: number;
  publishDate?: Date;
  updatedDate?: Date;
  fullName: string;
  userName: string;
  avatar: string;
  isFollowed: string;
  isMyPost: boolean;
  postCount: number;
  followCount: number;
  commentCount: number;
  viewCount: number;
  vote: VoteType;
  publishType: PublishType;
  willBePublishedOn: Date;
  tags: string[];
}

export interface PostFilter {
  title: string;
  tags: string[];
  user: string;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  orderBy: OrderBy | null;
  orderType: OrderType | null;
}
