import { Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { FaFilter, FaQuestionCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import PostFilter from "../../components/Filter/PostFilter/PostFilter";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import Gender from "../../enums/Gender";
import DefaultAvatar from "../../images/default_avatar.png";
import { UserProfileModel } from "../../model/accountModel";
import { PostFilter as FilterProps, PostList } from "../../model/postModel";
import { QuestionListModel } from "../../model/questionModel";
import "./userProfile.scss";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import { formatDateToStringDay } from "../../Helper/DateHelper";
import { SlPencil, SlUserFollow } from "react-icons/sl";
import { GetAllPostByUser } from "../../services/PostService";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { GetAllByQuestionUser } from "../../services/QuestionService";
import { GetDetailById, ToggleFollow } from "../../services/AccountService";
import { AxiosError } from "axios";
import NotFound from "../../images/not_found.png";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

function UserProfile() {
  const [info, setInfo] = useState<UserProfileModel | undefined>(undefined);
  const [menuIndex, setMenuIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [questions, setQuestion] = useState(questionData);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [questionTotalPage, setQuestionTotalPage] = useState(0);

  const [posts, setPosts] = useState(postData);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postTotalPage, setPostTotalPage] = useState(0);

  const [showFilter, setShowFilter] = useState(false);
  const [follow, setFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const userId = useParams().userId ?? "";
  const viewerId =
    useSelector((state: RootState) => state.account.BasicInfo?.id) ?? "";

  //filter state
  const [filter, setFilter] = useState<FilterProps>({
    title: "",
    tags: [],
    dateFrom: null,
    dateTo: null,
    orderBy: null,
    orderType: null,
    user: "", //Not used
  });

  const onPostPageChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPostPage(pageNumber);
  };

  const onQuestionPageChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentQuestionPage(pageNumber);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handlePageSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    setCurrentPostPage(1);
    if (currentPostPage == 1) {
      getDataPosts();
    }
  };

  const getDataPosts = () => {
    if (!loading) {
      setLoading(true);
      GetAllPostByUser(
        userId,
        filter.title,
        filter.tags,
        filter.orderBy,
        filter.orderType,
        filter.dateFrom ? filter.dateFrom.toDate() : null,
        filter.dateTo ? filter.dateTo.toDate() : null,
        currentPostPage - 1,
        pageSize
      )
        .then((res) => {
          setPosts(res.data.data);
          setPostTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getDataQuestions = () => {
    if (!loading) {
      setLoading(true);
      GetAllByQuestionUser(
        userId,
        filter.title,
        filter.tags,
        filter.orderBy,
        filter.orderType,
        filter.dateFrom ? filter.dateFrom.toDate() : null,
        filter.dateTo ? filter.dateTo.toDate() : null,
        currentQuestionPage - 1,
        pageSize
      )
        .then((res) => {
          setQuestion(res.data.data);
          setQuestionTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFilterPosts = () => {
    setCurrentPostPage(1);
    if (currentPostPage == 1) {
      getDataPosts();
    }
  };

  const onFilterQuestions = () => {
    setCurrentQuestionPage(1);
    if (currentPostPage == 1) {
      getDataQuestions();
    }
  };

  useEffect(() => {
    if (menuIndex == 0) getDataPosts();
    else if (menuIndex == 1) getDataQuestions();
  }, [pageSize, currentPostPage, currentQuestionPage, menuIndex]);

  useEffect(() => {
    GetDetailById(userId)
      .then((res) => {
        setInfo(res.data);
        setFollow(res.data.isFollowing);
      })
      .catch((error: AxiosError) => {
        setNotFound(true);
      });
  }, []);

  const handleFollowUser = () => {
    if (!followLoading) {
      setFollowLoading(true);
      ToggleFollow(userId)
        .then(() => {
          setFollow((prev) => !prev);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setFollowLoading(false);
        });
    }
  };

  return (
    <div className='userProfile'>
      <Header />
      {notFound && (
        <div className='userProfile-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {loading && <Spin fullscreen />}
      {!notFound && info && (
        <div className='userProfile-content'>
          <div className='userProfile-container'>
            <div className='userProfile-header'>
              <div className='userProfile-header-top'>
                <div className='userProfile-header-top-left'></div>
                <div className='userProfile-header-top-middle'></div>
                <div className='userProfile-header-top-right'></div>
              </div>
              <div className='userProfile-header-content'>
                <div className='userProfile-header-content-left'>
                  <img
                    src={info.avatar ?? DefaultAvatar}
                    alt=''
                    className='userProfile-header-content-left-avatar'
                  />
                  <div className='userProfile-header-content-left-info'>
                    <div className='userProfile-header-content-left-info-name'>
                      <h2 className='userProfile-header-content-left-info-name-fullname'>
                        {info.fullName}
                      </h2>
                      <p className='userProfile-header-content-left-info-name-username'>
                        @{info.userName}
                      </p>
                    </div>
                    <div className='userProfile-header-content-left-info-more'>
                      <div className='userProfile-header-content-left-info-more-post'>
                        <SlPencil />
                        <span className='userProfile-header-content-left-info-more-post-count'>
                          {info.postCount}
                        </span>
                        <span className='userProfile-header-content-left-info-more-post-label'>
                          Posts
                        </span>
                      </div>
                      <div className='userProfile-header-content-left-info-more-follow'>
                        <FaQuestionCircle />
                        <span className='userProfile-header-content-left-info-more-follow-count'>
                          {info.questionCount}
                        </span>
                        <span className='userProfile-header-content-left-info-more-follow-label'>
                          Questions
                        </span>
                      </div>
                      <div className='userProfile-header-content-left-info-more-follow'>
                        <SlUserFollow />
                        <span className='userProfile-header-content-left-info-more-follow-count'>
                          {info.followCount}
                        </span>
                        <span className='userProfile-header-content-left-info-more-follow-label'>
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {userId !== viewerId && (
                  <div className='userProfile-header-content-right'>
                    <div
                      className='userProfile-header-content-right-btnfollow'
                      onClick={handleFollowUser}
                    >
                      Follow{" "}
                      {followLoading ? (
                        <Spin className='userProfile-header-content-right-btnfollow-spin' />
                      ) : !follow ? (
                        <GoPlus />
                      ) : (
                        <FaCheck />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className='userProfile-header-menu'>
                <div
                  className={`userProfile-header-menu-item ${
                    menuIndex == 0 && "active"
                  }`}
                  onClick={() => {
                    setMenuIndex(0);
                  }}
                >
                  Posts
                </div>
                <div
                  className={`userProfile-header-menu-item ${
                    menuIndex == 1 && "active"
                  }`}
                  onClick={() => {
                    setMenuIndex(1);
                  }}
                >
                  Questions
                </div>
                <div
                  className={`userProfile-header-menu-item ${
                    menuIndex == 2 && "active"
                  }`}
                  onClick={() => {
                    setMenuIndex(2);
                  }}
                >
                  Information
                </div>
              </div>
            </div>
            <div className='userProfile-body'>
              {menuIndex == 0 && (
                <div className='myProfile-right-content'>
                  <div className='myProfile-right-content-filterLeft'>
                    <h2 className='myProfile-right-content-title'>Posts</h2>
                    {posts.length !== 0 && (
                      <>
                        <div className='myProfile-right-content-filterLeft-container'>
                          {posts.map((post, index) => (
                            <PostBlockList key={index} post={post} newTab />
                          ))}
                        </div>
                        <div className='myProfile-right-content-filterLeft-pagination'>
                          <Pagination
                            showQuickJumper
                            current={currentPostPage}
                            pageSize={pageSize}
                            total={postTotalPage}
                            onChange={onPostPageChange}
                            onShowSizeChange={handlePageSizeChange}
                            hideOnSinglePage
                          />
                        </div>
                      </>
                    )}
                    {!loading && posts.length == 0 && (
                      <div className='myProfile-right-content-filterLeft-nocontent'>
                        <p>There are no posts</p>
                      </div>
                    )}
                  </div>
                  <div className='myProfile-right-content-filterRight'>
                    <div
                      className={`myProfile-right-content-filterRight-container ${
                        showFilter && "show"
                      }`}
                    >
                      <div
                        className='myProfile-right-content-filterRight-container-background'
                        onClick={handleCloseFilter}
                      ></div>
                      <div className='myProfile-right-content-filterRight-container-filter'>
                        <PostFilter
                          filter={filter}
                          setFilter={setFilter}
                          onFilter={onFilterPosts}
                          onClose={handleCloseFilter}
                        />
                      </div>
                    </div>
                    <div
                      className='myProfile-right-content-filterRight-toggle'
                      onClick={handleShowFilter}
                    >
                      <FaFilter />
                    </div>
                  </div>
                </div>
              )}
              {menuIndex == 1 && (
                <div className='myProfile-right-content'>
                  <div className='myProfile-right-content-filterLeft'>
                    <h2 className='myProfile-right-content-title'>Questions</h2>
                    {posts.length !== 0 && (
                      <>
                        <div className='myProfile-right-content-filterLeft-container'>
                          {questions.map((question, index) => (
                            <QuestionBlock
                              key={index}
                              question={question}
                              newTab
                            />
                          ))}
                        </div>
                        <div className='myProfile-right-content-filterLeft-pagination'>
                          <Pagination
                            showQuickJumper
                            current={currentQuestionPage}
                            pageSize={pageSize}
                            total={questionTotalPage}
                            onChange={onQuestionPageChange}
                            onShowSizeChange={handlePageSizeChange}
                            hideOnSinglePage
                          />
                        </div>
                      </>
                    )}
                    {!loading && posts.length == 0 && (
                      <div className='myProfile-right-content-filterLeft-nocontent'>
                        <p>There are no questions</p>
                      </div>
                    )}
                  </div>
                  <div className='myProfile-right-content-filterRight'>
                    <div
                      className={`myProfile-right-content-filterRight-container ${
                        showFilter && "show"
                      }`}
                    >
                      <div
                        className='myProfile-right-content-filterRight-container-background'
                        onClick={handleCloseFilter}
                      ></div>
                      <div className='myProfile-right-content-filterRight-container-filter'>
                        <PostFilter
                          filter={filter}
                          setFilter={setFilter}
                          onFilter={onFilterQuestions}
                          onClose={handleCloseFilter}
                        />
                      </div>
                    </div>
                    <div
                      className='myProfile-right-content-filterRight-toggle'
                      onClick={handleShowFilter}
                    >
                      <FaFilter />
                    </div>
                  </div>
                </div>
              )}
              {menuIndex == 2 && (
                <div className='userProfile-body-info'>
                  <table>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>
                        Full name
                      </td>
                      <td className='userProfile-body-info-item-value'>
                        {info.fullName}
                      </td>
                    </tr>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>
                        UserName
                      </td>
                      <td className='userProfile-body-info-item-value'>
                        {info.userName}
                      </td>
                    </tr>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>
                        Date joined
                      </td>
                      <td className='userProfile-body-info-item-value'>
                        {formatDateToStringDay(info.dateJoined)}
                      </td>
                    </tr>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>
                        Date of birth
                      </td>
                      <td className='userProfile-body-info-item-value'>
                        {info.dob ? formatDateToStringDay(info.dob) : "Unknow"}
                      </td>
                    </tr>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>
                        Gender
                      </td>
                      <td className='userProfile-body-info-item-value'>
                        {Gender[info.gender]}
                      </td>
                    </tr>
                    <tr className='userProfile-body-info-item'>
                      <td className='userProfile-body-info-item-lable'>Bio</td>
                      <td className='userProfile-body-info-item-value'>
                        {info.bio}
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default UserProfile;

// const userInfo: UserProfileModel = {
//   avatar:
//     "https://i.pinimg.com/736x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
//   fullName: "Nguyen Thien Sua",
//   userName: "NTSua",
//   dob: new Date(2023, 9, 18),
//   dateJoined: new Date(2023, 10, 28),
//   bio: null, // "Binh tinh, di thang, ung dung",
//   gender: Gender.Male,
//   followCount: 235,
//   postCount: 10,
// };

const questionData: QuestionListModel[] = [
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

const postData: PostList[] = [
  {
    id: "18dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
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
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games, How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
];
