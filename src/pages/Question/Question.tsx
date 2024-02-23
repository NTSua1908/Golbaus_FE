import React, { useEffect, useState } from "react";
import "./question.scss";
import Banner from "../../images/home_banner.png";
import Header from "../../components/Header/Header";
import { QuestionListModel } from "../../model/questionModel";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import {
  GetFeaturedQuestionByToken,
  GetFollowUserQuestion,
  GetNewestQuestion,
} from "../../services/QuestionService";
import { AxiosError } from "axios";
import ViewMoreButton from "../../components/ViewMoreButton/ViewMoreButton";
import { Spin } from "antd";

const Question: React.FC = () => {
  const [newQuestions, setNewQuestions] = useState<QuestionListModel[]>([]);
  const [newQuestionsLoading, setNewQuestionsLoading] = useState(false);
  const [newQuestionsCurrenPage, setNewQuestionsCurrentPage] = useState(0);
  const [newQuestionsTotalPage, setNewQuestionsTotalPage] = useState(0);

  const [feauredQuestions, setFeauturedQuestions] = useState<
    QuestionListModel[]
  >([]);
  const [feauredQuestionsLoading, setFeauturedQuestionsLoading] =
    useState(false);
  const [feauredQuestionsCurrenPage, setFeauredQuestionsCurrentPage] =
    useState(0);
  const [feauredQuestionsTotalPage, setFeauredQuestionsTotalPage] = useState(0);

  const [followerQuestions, setFollowerQuestions] = useState<
    QuestionListModel[]
  >([]);
  const [followerQuestionsLoading, setFollowerQuestionsLoading] =
    useState(false);
  const [followerQuestionsCurrenPage, setFollowerQuestionsCurrentPage] =
    useState(0);
  const [followerQuestionsTotalPage, setFollowerQuestionsTotalPage] =
    useState(0);

  useEffect(() => {
    if (!newQuestionsLoading) {
      setNewQuestionsLoading(true);
      GetNewestQuestion(newQuestionsCurrenPage, 10)
        .then((res) => {
          setNewQuestions([...newQuestions, ...res.data.data]);
          setNewQuestionsTotalPage(res.data.totalPage);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setNewQuestionsLoading(false);
        });
    }
  }, [newQuestionsCurrenPage]);

  useEffect(() => {
    if (!feauredQuestionsLoading) {
      setFeauturedQuestionsLoading(true);
      GetFeaturedQuestionByToken(feauredQuestionsCurrenPage, 10)
        .then((res) => {
          setFeauturedQuestions([...feauredQuestions, ...res.data.data]);
          setFeauredQuestionsTotalPage(res.data.totalPage);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setFeauturedQuestionsLoading(false);
        });
    }
  }, [feauredQuestionsCurrenPage]);

  useEffect(() => {
    if (!followerQuestionsLoading) {
      setFollowerQuestionsLoading(true);
      GetFollowUserQuestion(followerQuestionsCurrenPage, 10)
        .then((res) => {
          setFollowerQuestions([...followerQuestions, ...res.data.data]);
          setFollowerQuestionsTotalPage(res.data.totalPage);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setFollowerQuestionsLoading(false);
        });
    }
  }, [followerQuestionsCurrenPage]);

  return (
    <div className='question'>
      <Header />
      <img className='question-banner' src={Banner} alt='' />
      <div className='question-container'>
        {newQuestionsLoading && (
          <>
            <h1 className='question-title'>New Questions</h1>
            <div
              className='postDetail-comment-loading'
              style={{ paddingTop: "50px" }}
            >
              <Spin />
            </div>
          </>
        )}
        {!newQuestionsLoading && (
          <>
            <h1 className='question-title'>New Questions</h1>
            {newQuestions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
            {newQuestionsCurrenPage + 1 <= newQuestionsTotalPage - 1 && (
              <ViewMoreButton onClick={() => {}} />
            )}
          </>
        )}

        {feauredQuestionsLoading && (
          <>
            <h1 className='question-title'>Featured Questions</h1>
            <div
              className='postDetail-comment-loading'
              style={{ paddingTop: "50px" }}
            >
              <Spin />
            </div>
          </>
        )}
        {!feauredQuestionsLoading && (
          <>
            <h1 className='question-title'>Featured Questions</h1>
            {feauredQuestions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
            {feauredQuestionsCurrenPage + 1 <=
              feauredQuestionsTotalPage - 1 && (
              <ViewMoreButton onClick={() => {}} />
            )}
          </>
        )}

        {followerQuestionsLoading && (
          <>
            <h1 className='question-title'>Followed Users' Activity</h1>
            <div
              className='postDetail-comment-loading'
              style={{ paddingTop: "50px" }}
            >
              <Spin />
            </div>
          </>
        )}
        {!followerQuestionsLoading && followerQuestions.length > 0 && (
          <>
            <h1 className='question-title'>Followed Users' Activity</h1>
            {followerQuestions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
            {followerQuestionsCurrenPage + 1 <=
              followerQuestionsTotalPage - 1 && (
              <ViewMoreButton onClick={() => {}} />
            )}
          </>
        )}
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
};

export default Question;

const questions: QuestionListModel[] = [
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
