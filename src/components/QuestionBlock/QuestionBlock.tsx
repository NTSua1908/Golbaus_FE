import React from 'react';
import './questionBlock.scss';
import { Link } from 'react-router-dom';
import { QuestionListModel } from '../../model/questionModel';
import { formatDayAgo } from '../../Helper/DateHelper';
import DisplayTags from '../DisplayTag/DisplayTags';

interface QuestionBlockProps {
  question: QuestionListModel;
}

function QuestionBlock({ question }: QuestionBlockProps) {
  return (
    <Link
      to={'/'}
      className='question-block'>
      <h3 className='question-block-title'>{question.title}</h3>
      <div className='question-block-info'>
        <div className='question-block-info-left'>
          <Link
            to={'users/'}
            className='question-block-info-left-link'>
            <img
              className='question-block-info-left-avatar'
              src={question.avatar}
              alt={question.fullName}
            />
            <span className='question-block-info-left-fullname'>
              {question.fullName}
            </span>
            <span className='question-block-info-left-reputation'>
              {question.reputation}
            </span>
          </Link>
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
