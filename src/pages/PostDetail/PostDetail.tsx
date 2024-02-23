import { Spin } from "antd";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  postLoading,
  postNotFound,
  removePost,
  setPostCommentPage,
  setPostContent,
} from "../../actions/postAction";
import CommentsTree from "../../components/CommentTree/CommentTree";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PostContent from "../../components/PostContent/PostContent";
import PostGrid from "../../components/PostGrid/PostGrid";
import RequiredLogin from "../../components/RequiredLogin/RequiredLogin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import SwipperContent from "../../components/SwiperContent/SwiperContent";
import NotFound from "../../images/not_found.png";
import { CommentDetailModel } from "../../model/commentModel";
import { PostList } from "../../model/postModel";
import { GetPostComment } from "../../services/CommentService";
import {
  GetDetail,
  GetOtherPostByUser,
  GetRelatedPost,
  IncreateView,
} from "../../services/PostService";
import { RootState } from "../../store/configureStore";
import "./postDetail.scss";

const amount = 10;

function PostDetail() {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const post = useSelector((state: RootState) => state.post.post);

  const [otherPosts, setOtherPosts] = useState<PostList[]>([]);
  const [isOtherPostLoading, setOtherPostLoading] = useState(false);

  const [relatedPost, setRelatedPosts] = useState<PostList[]>([]);
  const [isRelatedPostLoading, setRelatedPostLoading] = useState(false);

  const [comments, setComments] = useState<CommentDetailModel[]>([]);
  const page = useSelector((state: RootState) => state.post.page) ?? 0;
  const [totalCount, setTotalCount] = useState(0);

  const isNotFound = useSelector((state: RootState) => state.post.isNotFound);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const [isCommentLoading, setCommentLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const dispatch = useDispatch();

  const [isRequiredLogin, setRequiredLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  let { postId } = useParams();
  let { state } = useLocation();

  const handleCloseRequiredLogin = () => {
    setRequiredLogin(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !isLoading &&
      postId &&
      (!post || post.id != postId || (state && state.isReload))
    ) {
      if (post) {
        dispatch(removePost());
      }
      if (state && state.isReload) {
        state.isReload = false;
      }
      dispatch(postLoading());
      GetDetail(postId)
        .then((res) => {
          dispatch(setPostContent(res.data));

          timeoutRef.current = setTimeout(async () => {
            if (postId) {
              await IncreateView(postId)
                .then()
                .catch((err) => {});
            }
          }, 15000);

          if (!isOtherPostLoading) {
            setOtherPostLoading(true);
            GetOtherPostByUser(res.data.userId, res.data.id, 0, 10)
              .then((res) => {
                setOtherPosts(res.data.data);
              })
              .catch((error: AxiosError) => {})
              .finally(() => {
                setOtherPostLoading(false);
              });
          }

          if (!isRelatedPostLoading) {
            setRelatedPostLoading(true);
            GetRelatedPost(res.data.id, res.data.tags, 0, 9)
              .then((res) => {
                setRelatedPosts(res.data.data);
              })
              .catch((error: AxiosError) => {})
              .finally(() => {
                setRelatedPostLoading(false);
              });
          }
        })
        .catch((error: AxiosError) => {
          if (error.request.status === 400) {
            dispatch(postNotFound());
          }
        });
    } else {
      if (!isOtherPostLoading && post) {
        setOtherPostLoading(true);
        GetOtherPostByUser(post.userId, post.id, 0, 10)
          .then((res) => {
            setOtherPosts(res.data.data);
          })
          .catch((error: AxiosError) => {})
          .finally(() => {
            setOtherPostLoading(false);
          });
      }

      if (!isRelatedPostLoading && post) {
        setRelatedPostLoading(true);
        GetRelatedPost(post.userId, post.tags, 0, 10)
          .then((res) => {
            setRelatedPosts(res.data.data);
          })
          .catch((error: AxiosError) => {})
          .finally(() => {
            setRelatedPostLoading(false);
          });
      }
    }

    if (!isCommentLoading && postId) {
      setCommentLoading(true);
      GetPostComment(postId)
        .then((res) => {
          setComments(res.data.data);
          setTotalCount(res.data.totalCount);
          setFirstTime(false);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setCommentLoading(false);
        });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [postId]);

  useEffect(() => {
    if (!isCommentLoading && postId && !firstTime) {
      setCommentLoading(true);
      GetPostComment(postId, page, 10)
        .then((res) => {
          console.log(res.data);
          setComments(res.data.data);
          dispatch(setPostCommentPage(res.data.page));
          setTotalCount(res.data.totalCount);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setCommentLoading(false);
        });
    }
  }, [page]);

  return (
    <div>
      <Header />
      {isNotFound && (
        <div className='postDetail-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {isLoading && (
        <div>
          <Spin fullscreen size='large' />
        </div>
      )}
      {post && post.id === postId && (
        <div className='postDetail'>
          <div className='postDetail-content'>
            <PostContent
              id={post.id}
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              excerpt={post.excerpt}
              avatar={post.avatar}
              userId={post.userId}
              fullname={post.fullName}
              username={post.userName}
              updatedDate={post.updatedDate}
              publishDate={post.publishDate}
              viewCount={post.viewCount}
              postCount={post.postCount}
              commentCount={post.commentCount}
              followCount={post.followCount}
              countVote={post.countVote}
              isMyPost={post.isMyPost}
              vote={post.vote}
              publishType={post.publishType}
              willBePublishedOn={post.willBePublishedOn}
              tags={post.tags}
              handleOpenModal={setRequiredLogin}
              isFollowing={post.isFollowing}
              isMarked={post.isMarked}
            />
          </div>
          <div className='postDetail-more'>
            {isOtherPostLoading && (
              <>
                <h2 className='postDetail-more-other'>
                  Other posts by {post.fullName}
                </h2>
                <div className='postDetail-comment-loading'>
                  <Spin />
                </div>
              </>
            )}
            {!isOtherPostLoading && otherPosts.length !== 0 && (
              <>
                <h2 className='postDetail-more-other'>
                  Other posts by {post.fullName}
                </h2>
                <SwipperContent contents={otherPosts} />
              </>
            )}

            {isRelatedPostLoading && (
              <>
                <h2 className='postDetail-more-related'>Related Posts</h2>
                <div className='postDetail-comment-loading'>
                  <Spin />
                </div>
              </>
            )}
            {!isRelatedPostLoading && relatedPost.length !== 0 && (
              <>
                <h2 className='postDetail-more-related'>Related Posts</h2>
                <div className='postDetail-more-related-container'>
                  <PostGrid posts={relatedPost} />
                </div>
              </>
            )}
          </div>
          <div className='postDetail-comment'>
            <h2 className='postDetail-comment-title'>Comments</h2>
            {isCommentLoading && (
              <div className='postDetail-comment-loading'>
                <Spin fullscreen />
              </div>
            )}
            <CommentsTree
              postId={post.id}
              userName={post.userName}
              data={comments != undefined ? comments : []}
              amount={amount ? amount : 10}
              page={page ? page : 0}
              totalCount={totalCount ? totalCount : 0}
            />
          </div>
        </div>
      )}
      <RequiredLogin
        show={isRequiredLogin}
        handleClose={handleCloseRequiredLogin}
      />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default PostDetail;
