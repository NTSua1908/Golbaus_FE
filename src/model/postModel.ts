import PublishType from "../enums/PublishType";

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
