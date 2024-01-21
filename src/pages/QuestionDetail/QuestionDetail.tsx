import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  QuestionDetailModel,
  QuestionListModel,
} from "../../model/questionModel";
import VoteType from "../../enums/VoteType";
import QuestionContent from "../../components/QuestionContent/QuestionContent";
import { Link, useParams } from "react-router-dom";
import RequiredLogin from "../../components/RequiredLogin/RequiredLogin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Spin } from "antd";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";
import NotFound from "../../images/not_found.png";
import AnswerTree from "../../components/AnswerTree/AnswerTree";
import { CommentDetailModel } from "../../model/commentModel";
import "./questionDetail.scss";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";

const amount = 10;
function QuestionDetail() {
  let { questionId } = useParams();
  const question =
    useSelector((state: RootState) => state.question.question) ?? questionData;
  const isNotFound = useSelector((state: RootState) => state.post.isNotFound);
  const [isRequiredLogin, setRequiredLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  const [answer, setAnswers] = useState<CommentDetailModel[]>(answerData);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [relatedQuestions, setRelatedQuestions] = useState(questionListData);
  const [newQuestions, setNewQuestions] = useState(questionListData);

  const handleCloseRequiredLogin = () => {
    setRequiredLogin(false);
  };

  return (
    <div className='questionDetail'>
      <Header />
      {isNotFound && (
        <div className='postDetail-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {loading && (
        <div>
          <Spin fullscreen size='large' />
        </div>
      )}
      {questionId && (
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
                page={page ? page : 0}
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
  date: new Date(2023, 11, 22, 15, 43, 22),
  fullName: "Nguyen Thien Sua",
  followCount: 23,
  viewCount: 123,
  commentCount: 12,
  tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  isMyQuestion: true,
  questionCount: 12,
  userName: "NTSua1908",
  vote: VoteType.Unvote,
  voteCount: 235,
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
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    followCount: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
];
