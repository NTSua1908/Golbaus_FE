import { SwiperCardContent } from "../components/SwiperContent/SwiperContent";
import { PostBlock, PostList } from "../model/postModel";

export function ParsePostTrendingToSwiperCardContent(
  PostTrending: PostList
): SwiperCardContent {
  return {
    id: PostTrending.id,
    date: PostTrending.date,
    title: PostTrending.title,
    thumbnail: PostTrending.thumbnail,
    authorAvatar: PostTrending.authorAvatar,
    authorName: PostTrending.authorName,
    excerpt: PostTrending.excerpt,
    commentCount: PostTrending.commentCount,
    viewCount: PostTrending.viewCount,
    upVote: PostTrending.upVote,
    downVote: PostTrending.downVote,
  };
}

export function ParsePostTrendingToPostBlock(
  PostTrending: PostList
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
