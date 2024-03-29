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
import { GetAllQuestion } from "../../services/QuestionService";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [requestText, setRequestText] = useState("");
  const requestTag = queryParams.get("tag");
  const [activeIndex, setActiveIndex] = useState(0);

  const [questions, setQuestion] = useState<QuestionListModel[]>([]);
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

  const getDataQuestions = () => {
    if (!loading) {
      setLoading(true);
      GetAllQuestion(
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
          setQuestion(res.data.data);
          setQuestionTotalPage(res.data.totalCount);
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFilterPosts = () => {
    setCurrentPostPage(1);
    setRequestText(filter.title);
    setSearchText(filter.title);
    if (currentPostPage == 1) {
      getDataPosts();
    }
    navigate("/Search?searchText=" + filter.title);
  };

  const onFilterQuestions = () => {
    setCurrentQuestionPage(1);
    setRequestText(filter.title);
    setSearchText(filter.title);
    if (currentPostPage == 1) {
      getDataQuestions();
    }
    navigate("/Search?searchText=" + filter.title);
  };

  useEffect(() => {
    if (activeIndex == 0) getDataPosts();
    else if (activeIndex == 1) getDataQuestions();
  }, [pageSize, currentPostPage, reload, currentQuestionPage, activeIndex]);

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
              // if (firstTime) {
              // onFilterQuestions();
              // setFirstTime(false);
              // }
            }}
          >
            Questions
          </div>
        </div>
        <div className='search-result'>
          {activeIndex == 0 && (
            <div className='search-result-content'>
              <div className='search-result-content-filterLeft'>
                {posts.length !== 0 && (
                  <>
                    <div className='search-result-content-filterLeft-container'>
                      {posts.map((post, index) => (
                        <PostBlockList key={index} post={post} />
                      ))}
                    </div>
                    <div className='search-result-content-filterLeft-pagination'>
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
                {!loading && posts.length === 0 && (
                  <div className='search-result-content-filterLeft-nocontent'>
                    <p>There are no results</p>
                  </div>
                )}
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
                      onFilter={onFilterPosts}
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
                {questions.length !== 0 && (
                  <>
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
                        onChange={onQuestionPageChange}
                        onShowSizeChange={handlePageSizeChange}
                        hideOnSinglePage
                      />
                    </div>
                  </>
                )}
                {!loading && questions.length === 0 && (
                  <div className='search-result-content-filterLeft-nocontent'>
                    <p>There are no results</p>
                  </div>
                )}
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
                      onFilter={onFilterQuestions}
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
