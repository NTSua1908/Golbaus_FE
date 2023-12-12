import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './commentTree.scss';
import {
  TiArrowRight,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from 'react-icons/ti';
import { SlOptionsVertical } from 'react-icons/sl';
import VoteType from '../../enums/VoteType';
import { Link } from 'react-router-dom';

export interface Comment {
  id: string;
  avatar: string;
  username: string;
  fullName: string;
  date: string;
  text: string;
  upvotes: number;
  downvotes: number;
  replyFor: string; //username
  replies?: Comment[]; // Array of nested comments
  totalReplyCount: number;
  vote: VoteType;
}

interface CommentProps {
  comment: Comment;
}

// const Comment = ({ comment }: CommentProps) => {

//   return (
//     <div className="comment">
//       <div className="comment-info">
//         <img src={comment.avatar} alt="User Avatar" className="avatar" />
//         <div className="user-details">
//           <span className="username">{comment.username}</span>
//           <span className="full-name">{comment.fullName}</span>
//           <span className="date">{comment.date}</span>
//         </div>
//       </div>
//       <p className="comment-text">{comment.text}</p>
//       <div className="comment-actions">
//         <span className="upvote">Upvote: {comment.upvotes}</span>
//         <span className="downvote">Downvote: {comment.downvotes}</span>
//         <button className="reply-btn" onClick={handleReplyClick}>
//           Reply
//         </button>
//         <button className="report-btn">Report</button>
//       </div>

//       {comment.replies && (
//         <div className="replies">
//           {comment.replies.map((reply) => (
//             <Comment key={reply.id} comment={reply} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const Comment = React.memo(({ comment }: CommentProps) => {
  const [isReply, setReply] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [replies, setReplies] = useState(comment.replies); // list comment reply
  const [isShowOption, setShowOption] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(comment.text);
  const [editContent, setEditContent] = useState(comment.text);

  //vote state
  const [upvote, setUpvote] = useState(comment.upvotes);
  const [downvote, setDownvote] = useState(comment.downvotes);
  const [vote, setVote] = useState(comment.vote);

  //add reply
  const [addReply, setAddReply] = useState('');

  const handleReplyClick = () => {
    setReply(!isReply);
  };

  const handleShowReplyClick = () => {
    setShowComment(!showComment);
  };

  const handleShowOption = () => {
    setShowOption(!isShowOption);
  };

  console.log(comment.id, comment.totalReplyCount);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSaveEditComment = () => {
    //Handle save (call API...)

    //Assume save success
    setContent(editContent);
    setEdit(false);
  };

  const handleCancelEditComment = () => {
    setEditContent(content);
    setEdit(false);
  };

  const handleUpvote = () => {
    if (vote == VoteType.Unvote) {
      setUpvote(upvote + 1);
      setVote(VoteType.Up);
    } else if (vote == VoteType.Up) {
      setUpvote(upvote - 1);
      setVote(VoteType.Unvote);
    } else if (vote == VoteType.Down) {
      setUpvote(upvote + 1);
      setDownvote(downvote - 1);
      setVote(VoteType.Up);
    }
  };

  const handleDownvote = () => {
    if (vote == VoteType.Unvote) {
      setDownvote(downvote + 1);
      setVote(VoteType.Down);
    } else if (vote == VoteType.Down) {
      setDownvote(downvote - 1);
      setVote(VoteType.Unvote);
    } else if (vote == VoteType.Up) {
      setDownvote(downvote + 1);
      setUpvote(upvote - 1);
      setVote(VoteType.Down);
    }
  };

  const handleAddReply = () => {};

  const handleCancelReply = () => {
    setReply(false);
  };

  return (
    <div className='comment'>
      <div className='comment-header'>
        <img
          src={comment.avatar}
          alt='User Avatar'
          className='comment-header-avatar'
        />
      </div>
      <div className='comment-content'>
        {isEdit ? (
          <ReplyForm
            content={editContent}
            setContent={setEditContent}
            onSave={handleSaveEditComment}
            onCancel={handleCancelEditComment}
          />
        ) : (
          <div className='comment-content-container'>
            <div className='comment-content-left'>
              <div className='comment-content-details'>
                <span className='comment-content-details-fullname'>
                  {comment.fullName}
                </span>
                <span className='comment-content-details-username'>
                  @{comment.username}
                </span>
                <span className='comment-content-details-date'>
                  {comment.date}
                </span>
              </div>
              <div className='comment-content-message'>
                <Link to={`/user/profile/${'fill-later'}`}>
                  @{comment.replyFor}
                </Link>{' '}
                {content}
              </div>
              <div className='comment-content-function'>
                <div className='comment-content-function-votes'>
                  <div
                    className={`comment-content-function-votes-up ${
                      vote == VoteType.Up && 'selected'
                    }`}
                    onClick={handleUpvote}>
                    <TiArrowSortedUp />
                    <span>{upvote}</span>
                  </div>
                  <div
                    className={`comment-content-function-votes-down ${
                      vote == VoteType.Down && 'selected'
                    }`}
                    onClick={handleDownvote}>
                    <TiArrowSortedDown />
                    <span>{downvote}</span>
                  </div>
                </div>
                <div
                  className='comment-content-function-reply'
                  onClick={handleReplyClick}>
                  Reply
                </div>
              </div>
            </div>
            <div
              className='comment-content-option'
              ref={optionRef}
              onClick={handleShowOption}>
              <SlOptionsVertical />
              <div
                className={`comment-content-option-menu ${
                  isShowOption && 'show'
                }`}>
                <ul>
                  <li className='comment-content-option-menu-item'>Report</li>
                  {/* Validate later */}
                  <li
                    className='comment-content-option-menu-item'
                    onClick={() => {
                      setEdit(true);
                    }}>
                    Edit
                  </li>
                  <li className='comment-content-option-menu-item'>Delete</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {comment.totalReplyCount > 0 && (
          <div
            className='comment-content-showComment'
            onClick={handleShowReplyClick}>
            <div
              className={`comment-content-showComment-button ${
                showComment && 'show'
              }`}>
              <TiArrowRight />
            </div>
            <div className='comment-content-showComment-label'>
              Show replies
            </div>
          </div>
        )}

        {isReply && (
          <ReplyForm
            content={editContent}
            setContent={setEditContent}
            onSave={handleSaveEditComment}
            onCancel={handleCancelEditComment}
          />
        )}
        <div
          className={`comment-content-replies ${
            showComment && replies && 'show'
          }`}>
          {replies && replies.map((reply) => <Comment comment={reply} />)}
        </div>
      </div>
    </div>
  );
});

interface ReplyFormProps {
  onSave: () => void;
  onCancel: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({
  onSave,
  onCancel,
  content,
  setContent,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
    console.log(e.currentTarget.value, e.currentTarget.value.length === 0);
  };

  return (
    <div className='comment-reply-form'>
      <textarea
        className='comment-reply-form-input'
        value={content}
        onChange={handleChange}
      />
      <div className='comment-reply-form-function'>
        <button
          className='comment-reply-form-function-save'
          onClick={onSave}
          disabled={content.length === 0}>
          Save changes
        </button>
        <button
          className='comment-reply-form-function-cancel'
          onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface CommentTreeProps {
  comments: Comment[];
}

const CommentsTree = ({ comments }: CommentTreeProps) => {
  return (
    <div className='comments-tree'>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default React.memo(CommentsTree);
