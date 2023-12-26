import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PostBlockLarge from "../../components/PostBlock/PostBlockLarge/PostBlockLarge";
import "./home.scss";
import FeaturedPost from "../../components/PostBlock/FeaturedPost/FeaturedPost";
import { PostBlock, PostTrending } from "../../model/postModel";
import TrendingPost from "../../components/PostBlock/TrendingPost/TrendingPost";
import { QuestionListModel } from "../../model/questionModel";
import { title } from "@uiw/react-md-editor";
import { queries } from "@testing-library/react";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import SwipperContent, {
  SwiperCardContent,
} from "../../components/SwiperContent/SwiperContent";
import { Link } from "react-router-dom";
import { ParsePostTrendingToPostBlock } from "../../Helper/ObjectParser";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import Banner from "../../images/home_banner.png";

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
const questions: QuestionListModel[] = [
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
];

function Home() {
  console.log("Home");
  return (
    <div>
      <Header />
      <div className="home">
        <img className="home-banner" src={Banner} alt="" />
        <div className="home-container">
          <h1 className="home-name">GOLBAUS</h1>
          <p className="home-introduce">
            Welcome to Golbaus, a vibrant and inclusive community where
            knowledge meets collaboration, and experiences are shared to empower
            one another. In this digital haven, we believe that every individual
            holds a unique perspective, a wealth of knowledge, and a treasure
            trove of experiences that can profoundly impact the lives of others.
            Our blog is not just a platform; it's a dynamic space where users
            come together to celebrate the diversity of ideas and foster a
            spirit of mutual growth.
          </p>
          <h1 className="home-title">NEW POSTS</h1>
          <div className="home-trending-swipper">
            <SwipperContent contents={contents} />
          </div>
          <div className="home-content">
            <div className="home-content-featured">
              <h3 className="home-content-title">Featured Posts</h3>
              <div className="home-content-line">
                <div className="home-content-line-left"></div>
                <div className="home-content-line-right"></div>
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
            <div className="home-content-trending">
              <h3 className="home-content-title">Trending</h3>
              <div className="home-content-line">
                <div className="home-content-line-left"></div>
                <div className="home-content-line-right"></div>
              </div>
              <div className="home-content-trending-container">
                {contents.map((post, index) => (
                  <TrendingPost
                    index={index + 1}
                    post={ParsePostTrendingToPostBlock(post)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="home-content-special-post">
            <PostBlockLarge post={post} />
          </div>

          <ViewMoreButton onClick={() => {}} />

          <h1 className="home-title">NEW QUESTIONS</h1>
          <div className="home-content-question">
            {questions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
          </div>
          <ViewMoreButton onClick={() => {}} />
        </div>
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
