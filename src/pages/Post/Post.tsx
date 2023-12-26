import React from "react";
import Banner from "../../images/home_banner.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./post.scss";
import { PostBlock, PostTrending } from "../../model/postModel";
import TrendingPost from "../../components/PostBlock/TrendingPost/TrendingPost";
import PostBlockLarge from "../../components/PostBlock/PostBlockLarge/PostBlockLarge";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import { ParsePostTrendingToPostBlock } from "../../Helper/ObjectParser";
import FeaturedPost from "../../components/PostBlock/FeaturedPost/FeaturedPost";
import SwipperContent from "../../components/SwiperContent/SwiperContent";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";

const contents: PostTrending[] = [
  {
    id: "1231231",
    thumbnail:
      "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2020/08/782784.jpg",
    title: "Stardev Valley 123",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley 456",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "1231231",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title:
      "New mod for Stardev Valley, New mod for Stardev Valley, New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games, How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
];

const post = {
  author: "Nguyen Thien Sua",
  date: new Date(2023, 12, 21),
  excerpt:
    "Bored with the same boxy blogging websites? Then Design Blog website template is an all-new way of representing the daily blogs with a trendy look. Bored with the same boxy blogging websites? Then Design Blog website template is an all-new way of representing the daily blogs with a trendy look.",
  thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
  title: "New mod for Stardew Valley",
  id: "asdfasdfdasf",
};

const posts: PostBlock[] = [
  post,
  post,
  post,
  post,
  post,
  post,
  post,
  post,
  post,
];

function Post() {
  return (
    <div className="post">
      <Header />
      <img className="post-banner" src={Banner} alt="" />
      <div className="post-container">
        <h1 className="post-title">NEW POSTS</h1>
        <div className="post-trending-swipper">
          <SwipperContent contents={contents} />
        </div>
        <div className="post-content">
          <div className="post-content-featured">
            <h3 className="post-content-title">Featured Posts</h3>
            <div className="post-content-line">
              <div className="post-content-line-left"></div>
              <div className="post-content-line-right"></div>
            </div>
            <FeaturedPost
              postMedium={post}
              postSmall1={post}
              postSmall2={post}
              postSmall3={post}
            />
            <FeaturedPost
              postMedium={post}
              postSmall1={post}
              postSmall2={post}
              postSmall3={post}
            />
          </div>
          <div className="post-content-trending">
            <h3 className="post-content-title">Trending</h3>
            <div className="post-content-line">
              <div className="post-content-line-left"></div>
              <div className="post-content-line-right"></div>
            </div>
            <div className="post-content-trending-container">
              {contents.map((post, index) => (
                <TrendingPost
                  index={index + 1}
                  post={ParsePostTrendingToPostBlock(post)}
                />
              ))}
            </div>
          </div>
        </div>

        <ViewMoreButton onClick={() => {}} />

        <h2 className="post-content-title">Followed Users' Activity</h2>
        <div className="post-content-followed"></div>
        {posts.map((post, index) => (
          <PostBlockList key={index} post={post} />
        ))}

        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
}

export default Post;
