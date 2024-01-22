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
import { GetDetail, IncreateView } from "../../services/QuestionService";
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

  const [answer, setAnswers] = useState<CommentDetailModel[]>(answerData);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [relatedQuestions, setRelatedQuestions] = useState(questionListData);
  const [newQuestions, setNewQuestions] = useState(questionListData);
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
        })
        .catch((error: AxiosError) => {
          if (error.request.status === 400) {
            dispatch(quesionNotFound());
          }
        })
        .finally(() => {
          setLoading(false);
        });
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

  useEffect(() => {
    timeoutRef.current = setTimeout(async () => {
      if (questionId) {
        await IncreateView(questionId)
          .then()
          .catch((err) => {});
      }
    }, 15000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
            </div>
            <div className='questionDetail-right-more'>
              <h2 className='questionDetail-right-more-title'>New questions</h2>
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

const questionData: QuestionDetailModel = {
  id: "123",
  title:
    "Use of malloc function instead of fgets for a file and an array[100000]",
  avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
  content: `## Horizontal Rules
___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__
`,
  createdDate: new Date(2023, 11, 22, 15, 43, 22),
  updatedDate: new Date(2023, 11, 22, 15, 43, 22),
  fullName: "Nguyen Thien Sua",
  followCount: 23,
  viewCount: 123,
  answerCount: 12,
  tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  isMyQuestion: true,
  questionCount: 12,
  userName: "NTSua1908",
  vote: VoteType.Unvote,
  voteCount: 235,
  isFollowed: true,
};

const answerData: CommentDetailModel[] = [
  {
    id: "1",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
    userName: "amily",
    fullName: "Amily",
    createdDate: new Date(2023, 12, 3, 1, 4, 34),
    content: `
    Reply to the first comment.   

\`\`\` js
const x = 1; 
const a: (string | undefined)[] = ['a', x === 1 ? 'b' : undefined];
console.log(a); 
\`\`\`
      
Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sunt commodi possimus odio, officia accusantium nemo nobis eaque odit beatae aperiam dolore doloribus ullam quisquam omnis numquam ratione libero in.
      `,
    upVote: 5,
    downVote: 1,
    replyFor: "alex",
    replyCount: 2,
    voteType: VoteType.Up,
    isMyComment: true,
    updatedDate: new Date(2023, 12, 3, 1, 4, 34),
    userId: "123",
    replies: [
      {
        id: "1.1",
        avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
        userName: "amily",
        fullName: "Amily",
        createdDate: new Date(2023, 12, 3, 1, 4, 34),
        content: `
\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`
`,
        upVote: 5,
        downVote: 1,
        replyFor: "alex",
        replyCount: 0,
        voteType: VoteType.Up,
        replies: [
          // Add more replies as needed
        ],
        isMyComment: true,
        updatedDate: new Date(2023, 12, 3, 1, 4, 34),
        userId: "123",
      },
      {
        id: "1.2",
        avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
        userName: "amily",
        fullName: "Amily",
        createdDate: new Date(2023, 12, 3, 1, 4, 34),
        content:
          "Reply to the first comment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sunt commodi possimus odio, officia accusantium nemo nobis eaque odit beatae aperiam dolore doloribus ullam quisquam omnis numquam ratione libero in.",
        upVote: 5,
        downVote: 1,
        replyFor: "alex",
        replyCount: 0,
        voteType: VoteType.Up,
        replies: [
          // Add more replies as needed
        ],
        isMyComment: true,
        updatedDate: new Date(2023, 12, 3, 1, 4, 34),
        userId: "123",
      },
    ],
  },
  {
    id: "2",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
    userName: "amily",
    fullName: "Amily",
    createdDate: new Date(2023, 12, 3, 1, 4, 34),
    content:
      "Reply to the first comment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sunt commodi possimus odio, officia accusantium nemo nobis eaque odit beatae aperiam dolore doloribus ullam quisquam omnis numquam ratione libero in.",
    upVote: 5,
    downVote: 1,
    replyFor: "alex",
    replyCount: 0,
    voteType: VoteType.Up,
    replies: [
      // Add more replies as needed
    ],
    isMyComment: true,
    updatedDate: new Date(2023, 12, 3, 1, 4, 34),
    userId: "123",
  },
  // Add more comments as needed
];

const questionListData: QuestionListModel[] = [
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
