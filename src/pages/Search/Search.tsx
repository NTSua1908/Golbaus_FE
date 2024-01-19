import { Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import { PostFilter as FilterProps, PostList } from "../../model/postModel";
import { QuestionListModel } from "../../model/questionModel";
import "./search.scss";
import PostFilter from "../../components/Filter/PostFilter/PostFilter";
import { FaFilter } from "react-icons/fa";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import InputSearch from "../../components/InputSearch/InputSearch";
import { GetAllPost } from "../../services/PostService";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [requestText, setRequestText] = useState("");
  const requestTag = queryParams.get("tag");
  const [activeIndex, setActiveIndex] = useState(0);

  const [questions, setQuestion] = useState(questionData);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [questionTotalPage, setQuestionTotalPage] = useState(100);
  const [pageSize, setPageSize] = useState(10);

  const [posts, setPosts] = useState<PostList[]>([]);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postTotalPage, setPostTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState(requestText ?? "");

  const navigate = useNavigate();

  //filter state
  const [filter, setFilter] = useState<FilterProps>({
    title: queryParams.get("searchText") ?? "",
    tags: requestTag ? [requestTag] : [],
    dateFrom: null,
    dateTo: null,
    orderBy: null,
    orderType: null,
    user: "", //Not used
  });

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPostPage(pageNumber);
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
      getData();
    }
  };

  const getData = () => {
    if (!loading) {
      setLoading(true);
      GetAllPost(
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
        .catch()
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFilter = () => {
    setCurrentPostPage(1);
    setRequestText(filter.title);
    setSearchText(filter.title);
    if (currentPostPage == 1) {
      getData();
    }
    navigate("/Search?searchText=" + filter.title);
  };

  useEffect(() => {
    getData();
  }, [pageSize, currentPostPage, reload]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get("searchText") ?? "";
    setRequestText(searchText);
    setFilter({ ...filter, title: searchText });
    setCurrentPostPage(1);
    setReload(!reload);
    setSearchText(searchText);
  }, [location.search]);

  return (
    <div className='search'>
      <Header />
      <h1 className='search-title'>Search posts and questions</h1>
      {loading && <Spin fullscreen />}
      <div className='search-container'>
        <div className='search-input'>
          <InputSearch value={searchText} setValue={setSearchText} />
        </div>
        {requestText && requestText.length != 0 && (
          <div className='search-for'>
            <h2>Search results for:</h2> <h3>"{requestText}"</h3>
          </div>
        )}
        <div className='search-menu'>
          <div
            className={`search-menu-item ${activeIndex == 0 && "active"}`}
            onClick={() => {
              setActiveIndex(0);
            }}
          >
            Posts
          </div>
          <div
            className={`search-menu-item ${activeIndex == 1 && "active"}`}
            onClick={() => {
              setActiveIndex(1);
            }}
          >
            Questions
          </div>
        </div>
        <div className='search-result'>
          {activeIndex == 0 && (
            <div className='search-result-content'>
              <div className='search-result-content-filterLeft'>
                <div className='search-result-content-filterLeft-container'>
                  {posts.map((post, index) => (
                    <PostBlockList key={index} post={post} newTab />
                  ))}
                </div>
                <div className='search-result-content-filterLeft-pagination'>
                  <Pagination
                    showQuickJumper
                    current={currentPostPage}
                    pageSize={pageSize}
                    total={postTotalPage}
                    onChange={onChange}
                    onShowSizeChange={handlePageSizeChange}
                    hideOnSinglePage
                  />
                </div>
              </div>
              <div className='search-result-content-filterRight'>
                <div
                  className={`search-result-content-filterRight-container ${
                    showFilter && "show"
                  }`}
                >
                  <div
                    className='search-result-content-filterRight-container-background'
                    onClick={handleCloseFilter}
                  ></div>
                  <div className='search-result-content-filterRight-container-filter'>
                    <PostFilter
                      filter={filter}
                      setFilter={setFilter}
                      onFilter={onFilter}
                      onClose={handleCloseFilter}
                    />
                  </div>
                </div>
                <div
                  className='search-result-content-filterRight-toggle'
                  onClick={handleShowFilter}
                >
                  <FaFilter />
                </div>
              </div>
            </div>
          )}
          {activeIndex == 1 && (
            <div className='search-result-content'>
              <div className='search-result-content-filterLeft'>
                <div className='search-result-content-filterLeft-container'>
                  {questions.map((question, index) => (
                    <QuestionBlock key={index} question={question} />
                  ))}
                </div>
                <div className='search-result-content-filterLeft-pagination'>
                  <Pagination
                    showQuickJumper
                    current={currentQuestionPage}
                    total={questionTotalPage}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='search-result-content-filterRight'>
                <div
                  className={`search-result-content-filterRight-container ${
                    showFilter && "show"
                  }`}
                >
                  <div
                    className='search-result-content-filterRight-container-background'
                    onClick={handleCloseFilter}
                  ></div>
                  <div className='search-result-content-filterRight-container-filter'>
                    <PostFilter
                      filter={filter}
                      setFilter={setFilter}
                      onFilter={onFilter}
                      onClose={handleCloseFilter}
                    />
                  </div>
                </div>
                <div
                  className='search-result-content-filterRight-toggle'
                  onClick={handleShowFilter}
                >
                  <FaFilter />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;

const questionData: QuestionListModel[] = [
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
