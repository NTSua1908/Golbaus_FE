import React from "react";
import "./questionBlock.scss";
import { Link } from "react-router-dom";
import { QuestionListModel } from "../../model/questionModel";
import { formatDayAgo } from "../../Helper/DateHelper";
import DisplayTags from "../DisplayTag/DisplayTags";
import { FaRegEye, FaRocketchat } from "react-icons/fa";
import DefaultAvatar from "../../images/default_avatar.png";

interface QuestionBlockProps {
  question: QuestionListModel;
  newTab?: boolean;
}

function QuestionBlock({ question, newTab }: QuestionBlockProps) {
  return (
    <Link
      to={"/question/" + question.id}
      className='question-block'
      target={newTab ? "_blank" : undefined}
    >
      <h3 className='question-block-title'>{question.title}</h3>
      <div className='question-block-info'>
        <div className='question-block-info-left'>
          <Link to={"users/"} className='question-block-info-left-link'>
            <img
              className='question-block-info-left-avatar'
              src={question.avatar ?? DefaultAvatar}
              alt={question.userName}
            />
            <span className='question-block-info-left-fullname'>
              {question.userName}
            </span>
            <span className='question-block-info-left-reputation'>
              {question.followCount}
            </span>
          </Link>
          <div className='question-block-info-left-stats'>
            <div className='question-block-info-left-stats-detail'>
              <span className='question-block-info-left-stats-detail-icon'>
                <FaRegEye />
              </span>
              {question.viewCount}
            </div>
            <div className='question-block-info-left-stats-detail'>
              <span className='question-block-info-left-stats-detail-icon'>
                <FaRocketchat />
              </span>
              {question.answerCount}
            </div>
          </div>
        </div>
        <div className='question-block-info-right'>
          {!question.updatedDate && formatDayAgo(question.createdDate)}
          {question.updatedDate && formatDayAgo(question.updatedDate)}
        </div>
      </div>
      <div className='question-block-tags'>
        <DisplayTags tags={question.tags} />
      </div>
    </Link>
  );
}

export default QuestionBlock;
