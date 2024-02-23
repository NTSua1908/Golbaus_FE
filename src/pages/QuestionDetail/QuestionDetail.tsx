import { Spin } from "antd";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  quesionNotFound,
  removeQuestion,
  setQuestionContent,
} from "../../actions/commentAction";
import AnswerTree from "../../components/AnswerTree/AnswerTree";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import QuestionContent from "../../components/QuestionContent/QuestionContent";
import RequiredLogin from "../../components/RequiredLogin/RequiredLogin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import VoteType from "../../enums/VoteType";
import NotFound from "../../images/not_found.png";
import { CommentDetailModel } from "../../model/commentModel";
import {
  QuestionDetailModel,
  QuestionListModel,
} from "../../model/questionModel";
import { GetQuestionComment } from "../../services/CommentService";
import {
  GetDetail,
  GetNewestQuestion,
  GetRelatedQuestion,
  IncreateView,
} from "../../services/QuestionService";
import { RootState } from "../../store/configureStore";
import "./questionDetail.scss";

const amount = 10;
function QuestionDetail() {
  let { questionId } = useParams();
  let { state } = useLocation();
  const question = useSelector((state: RootState) => state.question.question);
  const isNotFound = useSelector(
    (state: RootState) => state.question.isNotFound
  );
  const [isRequiredLogin, setRequiredLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  const [answer, setAnswers] = useState<CommentDetailModel[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [relatedQuestions, setRelatedQuestions] = useState<QuestionListModel[]>(
    []
  );
  const [relatedQuestionsLoading, setRelatedQuestionsLoading] = useState(false);

  const [newQuestions, setNewQuestions] = useState<QuestionListModel[]>([]);
  const [newQuestionsLoading, setNewQuestionsLoading] = useState(false);

  const [firstTime, setFirstTime] = useState(true);

  const dispatch = useDispatch();

  const handleCloseRequiredLogin = () => {
    setRequiredLogin(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !loading &&
      questionId &&
      (!question || question.id != questionId || (state && state.isReload))
    ) {
      if (question) {
        dispatch(removeQuestion());
      }
      if (state && state.isReload) {
        state.isReload = false;
      }
      setLoading(true);
      GetDetail(questionId)
        .then((res) => {
          dispatch(setQuestionContent(res.data));

          timeoutRef.current = setTimeout(async () => {
            if (questionId) {
              await IncreateView(questionId)
                .then()
                .catch((err) => {});
            }
          }, 15000);

          if (!relatedQuestionsLoading && res.data) {
            setRelatedQuestionsLoading(true);
            GetRelatedQuestion(res.data.id, res.data.tags, 0, 10)
              .then((res) => {
                setRelatedQuestions(res.data.data);
              })
              .catch((error: AxiosError) => {})
              .finally(() => {
                setRelatedQuestionsLoading(false);
              });
          }
        })
        .catch((error: AxiosError) => {
          if (error.request.status === 400) {
            dispatch(quesionNotFound());
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      //Get related questions
      if (!relatedQuestionsLoading && question) {
        setRelatedQuestionsLoading(true);
        GetRelatedQuestion(question.id, question.tags, 0, 10)
          .then((res) => {
            setRelatedQuestions(res.data.data);
          })
          .catch((error: AxiosError) => {})
          .finally(() => {
            setRelatedQuestionsLoading(false);
          });
      }
    }

    if (!answerLoading && questionId) {
      setAnswerLoading(true);
      GetQuestionComment(questionId)
        .then((res) => {
          setAnswers(res.data.data);
          setTotalCount(res.data.totalCount);
          setFirstTime(false);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setAnswerLoading(false);
        });
    }

    //Get new questions
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

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [questionId]);

  useEffect(() => {
    if (!answerLoading && questionId && !firstTime) {
      setAnswerLoading(true);
      GetQuestionComment(questionId, page - 1, 10)
        .then((res) => {
          setAnswers(res.data.data);
          setTotalCount(res.data.totalCount);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setAnswerLoading(false);
        });
    }
  }, [page]);

  return (
    <div className='questionDetail'>
      <Header />
      {isNotFound && (
        <div className='questionDetail-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {loading && (
        <div>
          <Spin fullscreen size='large' />
        </div>
      )}
      {question && question.id == questionId && (
        <div className='questionDetail-container'>
          <div className='questionDetail-left'>
            <QuestionContent
              id={questionId}
              question={question}
              handleOpenModal={setRequiredLogin}
            />
            <div className='questionDetail-comment'>
              <h2 className='questionDetail-comment-title'>Answers</h2>
              {answerLoading && (
                <div className='questionDetail-comment-loading'>
                  <Spin fullscreen />
                </div>
              )}
              <AnswerTree
                questionId={questionId}
                userName={question.userName}
                data={answer != undefined ? answer : []}
                amount={amount ? amount : 10}
                page={page ? page : 1}
                totalCount={totalCount ? totalCount : 0}
                setPage={setPage}
              />
            </div>
          </div>
          <div className='questionDetail-right'>
            <div className='questionDetail-right-more'>
              {relatedQuestionsLoading && (
                <>
                  <h2 className='questionDetail-right-more-title'>
                    Related questions
                  </h2>
                  <div className='postDetail-comment-loading'>
                    <Spin />
                  </div>
                </>
              )}
              {!relatedQuestionsLoading && relatedQuestions.length > 0 && (
                <>
                  <h2 className='questionDetail-right-more-title'>
                    Related questions
                  </h2>
                  <div className='questionDetail-right-more-block'>
                    {relatedQuestions.map((question, index) => (
                      <QuestionBlock key={index} question={question} />
                    ))}
                  </div>
                  <div className='questionDetail-right-more-list'>
                    {relatedQuestions.map((question, index) => (
                      <div className='questionDetail-right-more-list-item'>
                        <Link key={index} to={"/question/" + question.id}>
                          {question.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className='questionDetail-right-more'>
              {newQuestionsLoading && (
                <>
                  <h2 className='questionDetail-right-more-title'>
                    New questions
                  </h2>
                  <div className='postDetail-comment-loading'>
                    <Spin />
                  </div>
                </>
              )}
              {!newQuestionsLoading && newQuestions.length > 0 && (
                <>
                  <h2 className='questionDetail-right-more-title'>
                    New questions
                  </h2>
                  <div className='questionDetail-right-more-block'>
                    {newQuestions.map((question, index) => (
                      <QuestionBlock key={index} question={question} />
                    ))}
                  </div>
                  <div className='questionDetail-right-more-list'>
                    {newQuestions.map((question, index) => (
                      <div className='questionDetail-right-more-list-item'>
                        <Link key={index} to={"/question/" + question.id}>
                          {question.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
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

export default QuestionDetail;
