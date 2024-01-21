import React from "react";
import "./questionBlock.scss";
import { Link } from "react-router-dom";
import { QuestionListModel } from "../../model/questionModel";
import { formatDayAgo } from "../../Helper/DateHelper";
import DisplayTags from "../DisplayTag/DisplayTags";
import { FaRegEye, FaRocketchat } from "react-icons/fa";

interface QuestionBlockProps {
  question: QuestionListModel;
}

function QuestionBlock({ question }: QuestionBlockProps) {
  return (
    <Link to={"/question/" + question.id} className='question-block'>
      <h3 className='question-block-title'>{question.title}</h3>
      <div className='question-block-info'>
        <div className='question-block-info-left'>
          <Link to={"users/"} className='question-block-info-left-link'>
            <img
              className='question-block-info-left-avatar'
              src={question.avatar}
              alt={question.fullName}
            />
            <span className='question-block-info-left-fullname'>
              {question.fullName}
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
              {question.commentCount}
            </div>
          </div>
        </div>
        <div className='question-block-info-right'>
          {formatDayAgo(question.date)}
        </div>
      </div>
      <div className='question-block-tags'>
        <DisplayTags tags={question.tags} />
      </div>
    </Link>
  );
}

export default QuestionBlock;
