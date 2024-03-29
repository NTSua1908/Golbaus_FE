import { Dayjs } from "dayjs";
import PublishType from "../enums/PublishType";
import VoteType from "../enums/VoteType";
import OrderBy from "../enums/OrderBy";
import OrderType from "../enums/OrderType";

export interface PostBlock {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  date: Date;
}

export interface PostList {
  thumbnail: string;
  title: string;
  excerpt: string;
  upVote: number;
  downVote: number;
  viewCount: number;
  authorName: string;
  authorAvatar: string;
  commentCount: number;
  publishDate: Date;
  id: string;
}

export interface PostCreateModel {
  title: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  content: string;
  publishType: PublishType;
  willBePublishedOn: Date | null;
}

export interface PostDetailModel {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  content: string;
  countVote: number;
  publishDate: Date | null;
  updatedDate: Date | null;
  userId: string;
  fullName: string;
  userName: string;
  avatar: string;
  isFollowing: boolean;
  isMyPost: boolean;
  postCount: number;
  followCount: number;
  commentCount: number;
  viewCount: number;
  vote: VoteType;
  publishType: PublishType;
  willBePublishedOn: Date | null;
  tags: string[];
  isMarked: boolean;
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
