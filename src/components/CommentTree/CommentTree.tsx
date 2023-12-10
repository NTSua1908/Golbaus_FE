import React, { useState } from "react";
import "./commentTree.scss";

export interface Comment {
  id: string;
  avatar: string;
  username: string;
  fullName: string;
  date: string;
  text: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[]; // Array of nested comments
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

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [replying, setReplying] = useState(false);

  const handleReplyClick = () => {
    setReplying(!replying);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img src={comment.avatar} alt="Avatar" className="avatar" />
        <div className="info">
          <span className="username">{comment.username}</span>
          <span className="date">{comment.date}</span>
        </div>
      </div>
      <div className="comment-content">
        <p>{comment.text}</p>
        <div className="votes">
          <span>Upvotes: {comment.upvotes}</span>
          <span>Downvotes: {comment.downvotes}</span>
        </div>
        <button className="reply-btn" onClick={handleReplyClick}>
          Reply
        </button>
        <button className="report-btn">Report</button>
      </div>
      {replying && <ReplyForm />}
      {comment.replies && (
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <React.Fragment key={reply.id}>
              <div className="tree-line"></div>
              <Comment comment={reply} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

const ReplyForm = () => {
  // Add logic for reply form
  return <div className="reply-form">{/* Reply form components */}</div>;
};

interface CommentTreeProps {
  comments: Comment[];
}

const CommentsTree = ({ comments }: CommentTreeProps) => {
  return (
    <div className="comments-tree">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default React.memo(CommentsTree);
