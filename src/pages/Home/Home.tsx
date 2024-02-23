import { Spin } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FeaturedPost from "../../components/PostBlock/FeaturedPost/FeaturedPost";
import PostBlockLarge from "../../components/PostBlock/PostBlockLarge/PostBlockLarge";
import TrendingPost from "../../components/PostBlock/TrendingPost/TrendingPost";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import SwipperContent from "../../components/SwiperContent/SwiperContent";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import Banner from "../../images/home_banner.png";
import { PostBlock, PostList } from "../../model/postModel";
import { QuestionListModel } from "../../model/questionModel";
import {
  GetFeaturedPostByToken,
  GetNewestPost,
  GetPostTrending,
} from "../../services/PostService";
import { GetNewestQuestion } from "../../services/QuestionService";
import "./home.scss";

const contents: PostList[] = [
  {
    id: "28dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail:
      "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2020/08/782784.jpg",
    title: "Stardew Valley 1",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardew Valley 2",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc0c4a-13aa-4cc7-856e-09f0ac174146",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardew Valley 3",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title:
      "New mod for Stardev Valley, New mod for Stardev Valley, New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    publishDate: new Date(2023, 12, 23, 15, 22),
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
    id: "08dc1b05-a2ed-4451-8f69-1661997bf283",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: null,
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "08dc1b2f-a77c-4483-8dd8-728b1a2bd28a",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: null,
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
];

function Home() {
  const [newestPosts, setNewestPosts] = useState<PostList[]>([]);
  const [newestPostsLoading, setNewestPostsLoading] = useState(false);

  const [featuredPosts, setFeaturedPosts] = useState<PostBlock[][]>([]);
  const [featuredPostsLoading, setFeaturedPostsLoading] = useState(false);

  const [trendingPosts, setTrendingPosts] = useState<PostBlock[]>([]);
  const [trendingPostsLoading, setTrendingPostLoading] = useState(false);

  const [newQuestions, setNewQuestions] = useState<QuestionListModel[]>([]);
  const [newQuestionsLoading, setNewQuestionsLoading] = useState(false);

  const navigate = useNavigate();

  const gotoPosts = () => {
    navigate("/Post");
  };

  const gotoQA = () => {
    navigate("/Question");
  };

  useEffect(() => {
    setNewestPostsLoading(true);
    GetNewestPost()
      .then((res) => {
        setNewestPosts(res.data);
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        setNewestPostsLoading(false);
      });

    setTrendingPostLoading(true);
    GetPostTrending(0, 9)
      .then((res) => {
        setTrendingPosts(res.data.data);
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        setTrendingPostLoading(false);
      });

    setFeaturedPostsLoading(true);
    GetFeaturedPostByToken()
      .then((res) => {
        setFeaturedPosts(res.data);
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        setFeaturedPostsLoading(false);
      });

    if (!newQuestionsLoading) {
      setNewQuestionsLoading(true);
      GetNewestQuestion(0, 10)
        .then((res) => {
          setNewQuestions(res.data.data);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setNewQuestionsLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='home'>
        <img className='home-banner' src={Banner} alt='' />
        <div className='home-container'>
          <h1 className='home-name'>GOLBAUS</h1>
          <p className='home-introduce'>
            Welcome to Golbaus, a vibrant and inclusive community where
            knowledge meets collaboration, and experiences are shared to empower
            one another. In this digital haven, we believe that every individual
            holds a unique perspective, a wealth of knowledge, and a treasure
            trove of experiences that can profoundly impact the lives of others.
            Our blog is not just a platform; it's a dynamic space where users
            come together to celebrate the diversity of ideas and foster a
            spirit of mutual growth.
          </p>
          <h1 className='home-title'>NEW POSTS</h1>

          {newestPostsLoading && (
            <div className='postDetail-comment-loading'>
              <Spin />
            </div>
          )}
          {!newestPostsLoading && (
            <div className='home-trending-swipper'>
              <SwipperContent contents={newestPosts} />
            </div>
          )}
          <div className='home-content'>
            <div className='home-content-featured'>
              <h3 className='home-content-title'>Featured Posts</h3>
              <div className='home-content-line'>
                <div className='home-content-line-left'></div>
                <div className='home-content-line-right'></div>
              </div>
              {featuredPostsLoading && (
                <div
                  className='postDetail-comment-loading'
                  style={{ paddingTop: "50px" }}
                >
                  <Spin />
                </div>
              )}
              {!featuredPostsLoading &&
                featuredPosts
                  .slice(0, 2)
                  .map((post, index) => (
                    <FeaturedPost
                      postMedium={post[0]}
                      postSmall1={post[1]}
                      postSmall2={post[2]}
                      postSmall3={post[3]}
                    />
                  ))}
            </div>
            <div className='home-content-trending'>
              <h3 className='home-content-title'>Trending</h3>
              <div className='home-content-line'>
                <div className='home-content-line-left'></div>
                <div className='home-content-line-right'></div>
              </div>
              {trendingPostsLoading && (
                <div
                  className='postDetail-comment-loading'
                  style={{ paddingTop: "50px" }}
                >
                  <Spin />
                </div>
              )}
              {!trendingPostsLoading && (
                <div className='home-content-trending-container'>
                  {trendingPosts.map((post, index) => (
                    <TrendingPost key={index} index={index + 1} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {trendingPosts.length > 0 && (
            <div className='home-content-special-post'>
              <PostBlockLarge post={trendingPosts[0]!} />
            </div>
          )}

          <ViewMoreButton onClick={gotoPosts} />

          <h1 className='home-title'>NEW QUESTIONS</h1>
          {newQuestionsLoading && (
            <div
              className='postDetail-comment-loading'
              style={{ paddingTop: "50px" }}
            >
              <Spin />
            </div>
          )}

          {!newQuestionsLoading && (
            <>
              <div className='home-content-question'>
                {newQuestions.map((question, index) => (
                  <QuestionBlock key={index} question={question} />
                ))}
              </div>
              <ViewMoreButton onClick={gotoQA} />
            </>
          )}
        </div>
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
