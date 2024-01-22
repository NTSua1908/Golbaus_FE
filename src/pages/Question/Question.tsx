import React, { useState } from "react";
import "./question.scss";
import Banner from "../../images/home_banner.png";
import Header from "../../components/Header/Header";
import { QuestionListModel } from "../../model/questionModel";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Question: React.FC = () => {
  const [newQuestions, setNewQuestions] = useState(questions);
  const [feauredQuestions, setFeauturedQuestions] = useState(questions);
  const [followerQuestions, setFollowerQuestions] = useState(questions);

  return (
    <div className='question'>
      <Header />
      <img className='question-banner' src={Banner} alt='' />
      <div className='question-container'>
        <h1 className='question-title'>New Questions</h1>
        {newQuestions.map((question, index) => (
          <QuestionBlock key={index} question={question} />
        ))}
        <h1 className='question-title'>Featured Questions</h1>
        {feauredQuestions.map((question, index) => (
          <QuestionBlock key={index} question={question} />
        ))}
        <h1 className='question-title'>Followed Users' Activity</h1>
        {followerQuestions.map((question, index) => (
          <QuestionBlock key={index} question={question} />
        ))}
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
