import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./commentTree.scss";
import {
  TiArrowRight,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import VoteType from "../../enums/VoteType";
import { Link } from "react-router-dom";
import { command } from "yargs";

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
  replies: Comment[]; // Array of nested comments
  totalReplyCount: number;
  vote: VoteType;
}

interface CommentProps {
  comment: Comment;
  addParentComment?: (comment: Comment) => void;
}

const Comment = React.memo(({ comment, addParentComment }: CommentProps) => {
  const [isReply, setReply] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [replies, setReplies] = useState(comment.replies); // list comment reply
  const [isShowOption, setShowOption] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(comment.text);
  const [editContent, setEditContent] = useState(comment.text);
  const [totalCommentCount, setTotalCommentCount] = useState(
    comment.totalReplyCount
  );

  //vote state
  const [upvote, setUpvote] = useState(comment.upvotes);
  const [downvote, setDownvote] = useState(comment.downvotes);
  const [vote, setVote] = useState(comment.vote);

  //add reply
  const [addReply, setAddReply] = useState("");
  const handleReply = () => {
    // debugger;
    const commentReply: Comment = {
      avatar:
        "https://i.pinimg.com/564x/94/9b/8d/949b8d8d9229693ba9d53b054b738e2a.jpg", //My avatar
      fullName: "Nguyen Thien Sua", //My full name,
      username: "ntsua", //My username,
      replyFor: comment.username, //Post author user name
      date: "2023-12-12 12:34 PM",
      downvotes: 0,
      upvotes: 0,
      id: "1.4" + addReply,
      text: addReply,
      totalReplyCount: 0,
      replies: [],
      vote: VoteType.Unvote,
    };
    if (addParentComment) {
      addParentComment(commentReply);
    } else {
      setReplies([...replies, commentReply]);
      if (totalCommentCount == 0) {
        setTotalCommentCount(1);
        setShowComment(true);
      }
    }
    setAddReply("");
    setReply(false);
  };

  const handleCancelReply = () => {
    setAddReply("");
    setReply(false);
  };

  const handleReplyClick = () => {
    setReply(!isReply);
  };

  const handleShowReplyClick = () => {
    setShowComment(!showComment);
  };

  const handleShowOption = () => {
    setShowOption(!isShowOption);
  };

  console.log(comment.id);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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

  const AddParentComment = (comment: Comment) => {
    setReplies([...replies, comment]);
  };

  useEffect(() => {
    console.log(replies);
  }, [replies]);

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={comment.avatar}
          alt="User Avatar"
          className="comment-header-avatar"
        />
      </div>
      <div className="comment-content">
        {isEdit ? (
          <ReplyForm
            content={editContent}
            setContent={setEditContent}
            onSave={handleSaveEditComment}
            onCancel={handleCancelEditComment}
          />
        ) : (
          <div className="comment-content-container">
            <div className="comment-content-left">
              <div className="comment-content-details">
                <span className="comment-content-details-fullname">
                  {comment.fullName}
                </span>
                <span className="comment-content-details-username">
                  @{comment.username}
                </span>
                <span className="comment-content-details-date">
                  {comment.date}
                </span>
              </div>
              <div
                className="comment-content-option"
                ref={optionRef}
                onClick={handleShowOption}
              >
                <SlOptionsVertical />
                <div
                  className={`comment-content-option-menu ${
                    isShowOption && "show"
                  }`}
                >
                  <ul>
                    <li className="comment-content-option-menu-item">Report</li>
                    {/* Validate later */}
                    <li
                      className="comment-content-option-menu-item"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      Edit
                    </li>
                    <li className="comment-content-option-menu-item">Delete</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="comment-content-message">
              <Link to={`/user/profile/${"fill-later"}`}>
                @{comment.replyFor}
              </Link>{" "}
              {content}
            </div>
            <div className="comment-content-function">
              <div className="comment-content-function-votes">
                <div
                  className={`comment-content-function-votes-up ${
                    vote == VoteType.Up && "selected"
                  }`}
                  onClick={handleUpvote}
                >
                  <TiArrowSortedUp />
                  <span>{upvote}</span>
                </div>
                <div
                  className={`comment-content-function-votes-down ${
                    vote == VoteType.Down && "selected"
                  }`}
                  onClick={handleDownvote}
                >
                  <TiArrowSortedDown />
                  <span>{downvote}</span>
                </div>
              </div>
              <div
                className="comment-content-function-reply"
                onClick={handleReplyClick}
              >
                Reply
              </div>
            </div>
          </div>
        )}
        {totalCommentCount > 0 && (
          <div
            className="comment-content-showComment"
            onClick={handleShowReplyClick}
          >
            <div
              className={`comment-content-showComment-button ${
                showComment && "show"
              }`}
            >
              <TiArrowRight />
            </div>
            <div className="comment-content-showComment-label">
              Show replies
            </div>
          </div>
        )}

        {isReply && (
          <div className="comment-content-form">
            <ReplyForm
              content={addReply}
              setContent={setAddReply}
              onSave={handleReply}
              onCancel={handleCancelReply}
            />
          </div>
        )}
        <div
          className={`comment-content-replies ${
            showComment && replies && "show"
          }`}
        >
          {replies &&
            replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                addParentComment={AddParentComment}
              />
            ))}
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
    // console.log(e.currentTarget.value, e.currentTarget.value.length === 0);
  };

  return (
    <div className="comment-reply-form">
      <textarea
        autoFocus
        className="comment-reply-form-input"
        value={content}
        onChange={handleChange}
        placeholder="Write your comment..."
      />
      <div className="comment-reply-form-function">
        <button
          className="comment-reply-form-function-save"
          onClick={onSave}
          disabled={content.length === 0}
        >
          Save changes
        </button>
        <button
          className="comment-reply-form-function-cancel"
          onClick={onCancel}
        >
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
  const [comment, setComment] = useState(comments);
  const [reply, setReply] = useState("");

  const handleOnAddComment = () => {
    // console.log(reply);
    setReply("");
    setComment([
      {
        avatar:
          "https://i.pinimg.com/564x/94/9b/8d/949b8d8d9229693ba9d53b054b738e2a.jpg", //My avatar
        fullName: "Nguyen Thien Sua", //My full name,
        username: "ntsua", //My username,
        replyFor: "Haley", //Post author user name
        date: "2023-12-12 12:34 PM",
        downvotes: 0,
        upvotes: 0,
        id: "1.4" + reply,
        text: reply,
        totalReplyCount: 0,
        replies: [],
        vote: VoteType.Unvote,
      },
      ...comment,
    ]);
  };

  const handleOnCancelComment = () => {
    setReply("");
  };

  return (
    <div className="comments-tree">
      <div className="comments-tree-new">
        <ReplyForm
          content={reply}
          setContent={setReply}
          onSave={handleOnAddComment}
          onCancel={handleOnCancelComment}
        />
      </div>
      <div className="comments-tree-list">
        {comment.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CommentsTree);
