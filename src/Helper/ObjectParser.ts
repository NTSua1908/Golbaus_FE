import { SwiperCardContent } from "../components/SwiperContent/SwiperContent";
import { PostBlock, PostTrending } from "../model/postModel";

export function ParsePostTrendingToSwiperCardContent(
  PostTrending: PostTrending
): SwiperCardContent {
  return {
    date: PostTrending.date,
    title: PostTrending.title,
    thumbnail: PostTrending.thumbnail,
    authorAvatar: PostTrending.authorAvatar,
    authorName: PostTrending.authorName,
    excerpt: PostTrending.excerpt,
    commentCount: PostTrending.commentCount,
    viewCount: PostTrending.viewCount,
    upvote: PostTrending.upvote,
    downvote: PostTrending.downvote,
  };
}

export function ParsePostTrendingToPostBlock(
  PostTrending: PostTrending
): PostBlock {
  return {
    id: PostTrending.id,
    date: PostTrending.date,
    title: PostTrending.title,
    thumbnail: PostTrending.thumbnail,
    author: PostTrending.authorName,
    excerpt: PostTrending.excerpt,
  };
}
