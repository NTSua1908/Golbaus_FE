import { useEffect, useLayoutEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FeaturedPost from "../../components/PostBlock/FeaturedPost/FeaturedPost";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import TrendingPost from "../../components/PostBlock/TrendingPost/TrendingPost";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import SwipperContent from "../../components/SwiperContent/SwiperContent";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import Banner from "../../images/home_banner.png";
import { PostBlock, PostList } from "../../model/postModel";
import "./post.scss";
import {
  GetFeaturedPostByToken,
  GetFollowUserPost,
  GetNewestPost,
  GetPostTrending,
} from "../../services/PostService";
import { AxiosError } from "axios";
import { Spin } from "antd";

function Post() {
  const [newestPosts, setNewestPosts] = useState<PostList[]>([]);
  const [newestPostsLoading, setNewestPostsLoading] = useState(false);

  const [featuredPosts, setFeaturedPosts] = useState<PostBlock[][]>([]);
  const [featuredPostsLoading, setFeaturedPostsLoading] = useState(false);
  const [featuredPostCurrentPage, setFeaturedPostCurrentPage] = useState(1);

  const [trendingPosts, setTrendingPosts] = useState<PostBlock[]>([]);
  const [trendingPostsLoading, setTrendingPostLoading] = useState(false);

  const [followPosts, setFollowPosts] = useState<PostList[]>([]);
  const [followPostsLoading, setFollowPostLoading] = useState(false);
  const [followPostsTotalPage, setFollowPostsTotalPage] = useState(0);
  const [followPostsCurrentPage, setFollowPostsCurrentPage] = useState(0);

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
  }, []);

  useEffect(() => {
    if (!followPostsLoading) {
      setFollowPostLoading(true);
      GetFollowUserPost(followPostsCurrentPage, 10)
        .then((res) => {
          setFollowPosts([...followPosts, ...res.data.data]);
          setFollowPostsTotalPage(res.data.totalPage);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setFollowPostLoading(false);
        });
    }
  }, [followPostsCurrentPage]);

  return (
    <div className='post'>
      <Header />
      <img className='post-banner' src={Banner} alt='' />
      <div className='post-container'>
        <h1 className='post-title'>NEW POSTS</h1>
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
        <div className='post-content'>
          <div className='post-content-featured'>
            <h3 className='post-content-title'>Featured Posts</h3>
            <div className='post-content-line'>
              <div className='post-content-line-left'></div>
              <div className='post-content-line-right'></div>
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
                .slice(0, 2 * featuredPostCurrentPage)
                .map((post, index) => (
                  <FeaturedPost
                    postMedium={post[0]}
                    postSmall1={post[1]}
                    postSmall2={post[2]}
                    postSmall3={post[3]}
                  />
                ))}
          </div>
          <div className='post-content-trending'>
            <h3 className='post-content-title'>Trending</h3>
            <div className='post-content-line'>
              <div className='post-content-line-left'></div>
              <div className='post-content-line-right'></div>
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

        {featuredPostCurrentPage * 2 < featuredPosts.length && (
          <ViewMoreButton
            onClick={() => {
              setFeaturedPostCurrentPage(featuredPostCurrentPage + 1);
            }}
          />
        )}

        {followPosts.length > 0 && (
          <>
            <h2 className='post-content-title'>Followed Users' Activity</h2>
            <div className='post-content-followed'>
              {followPosts.map((post, index) => (
                <PostBlockList key={index} post={post} />
              ))}
            </div>
          </>
        )}
        {followPostsLoading && (
          <div
            className='postDetail-comment-loading'
            style={{ paddingTop: "50px" }}
          >
            <Spin />
          </div>
        )}

        {!followPostsLoading &&
          followPostsCurrentPage < followPostsTotalPage - 1 && (
            <ViewMoreButton
              onClick={() => {
                setFollowPostsCurrentPage(followPostsCurrentPage + 1);
              }}
            />
          )}

        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
}

export default Post;
