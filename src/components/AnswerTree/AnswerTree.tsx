import { Pagination, Spin, notification } from "antd";
import { AxiosError } from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiEdit, CiFlag1 } from "react-icons/ci";
import { ImReply } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import {
  TiArrowRight,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateToString } from "../../Helper/DateHelper";
import VoteType from "../../enums/VoteType";
import {
  CommentCreateModel,
  CommentDetailModel,
  CommentUpdateModel,
} from "../../model/commentModel";
import {
  AddQuestionComment,
  DeleteQuestionComment,
  DownVoteQuestionComment,
  GetQuestionCommentReply,
  UpVoteQuestionComment,
  UpdateQuestionComment,
} from "../../services/CommentService";
import { RootState } from "../../store/configureStore";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import RequiredLogin from "../RequiredLogin/RequiredLogin";
import "./answerTree.scss";
import { setPostCommentPage } from "../../actions/postAction";
import BasicEditor from "../BasicEditor/BasicEditor";
import ContentDisplayer from "../ShowCode/ContentDisplayer";
import { FetchingErrorHandler } from "../../Helper/FetchingErrorHandler";
import DefaultAvatar from "../../images/default_avatar.png";

const amoutPerPage = 5;

interface CommentProps {
  comment: CommentDetailModel;
  addParentComment?: (comment: CommentDetailModel) => void;
  onDelete: (id: string) => void;
  questionId: string; //for create reply
  parentId: string; //for create reply
  setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>;
  setOnCancel: React.Dispatch<React.SetStateAction<() => void>>;
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  showRequireLogin: () => void;
}

const Answer = React.memo(
  ({
    comment,
    addParentComment,
    onDelete,
    questionId,
    parentId,
    setOnConfirm,
    setOnCancel,
    setShowDeleteConfirm,
    isAuthenticated,
    showRequireLogin,
  }: CommentProps) => {
    const [isReply, setReply] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [replies, setReplies] = useState(comment.replies ?? []); // list comment reply
    const [isShowOption, setShowOption] = useState(false);
    const optionRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState(comment.content);
    const [editContent, setEditContent] = useState(comment.content);
    const [totalCommentCount, setTotalCommentCount] = useState(
      comment.replyCount
    );

    //vote state
    const [upvote, setUpvote] = useState(comment.upVote);
    const [downvote, setDownvote] = useState(comment.downVote);
    const [vote, setVote] = useState(comment.voteType);

    const [api, contextHolder] = notification.useNotification();

    //Pagination for reply
    const [currentPage, setCurrentPage] = useState(
      Math.ceil(replies.length / amoutPerPage)
    );
    const handleLoadMoreReplies = () => {
      if (!isLoadingReply) {
        setLoadingReply(true);
        GetQuestionCommentReply(
          questionId,
          comment.id,
          currentPage,
          amoutPerPage
        )
          .then((res) => {
            setCurrentPage(currentPage + 1);
            setReplies([...replies, ...res.data.data]);
          })
          .catch()
          .finally(() => {
            setLoadingReply(false);
          });
      }
    };
    //add reply
    const [addReply, setAddReply] = useState("");
    const [isLoadingReply, setLoadingReply] = useState(false);

    const handleReply = async () => {
      const commentReply: CommentCreateModel = {
        content: addReply,
        parentId: parentId,
        replyFor: comment.userName,
        postId: questionId,
      };

      await AddQuestionComment(commentReply).then((res) => {
        console.log(res.data);
        if (addParentComment) {
          addParentComment(res.data);
        } else {
          setReplies([res.data, ...replies]);
          if (totalCommentCount == 0) {
            setTotalCommentCount(1);
            setCurrentPage(1);
            setShowComment(true);
          }
        }
      });

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
      if (replies.length == 0) {
        setLoadingReply(true);
        GetQuestionCommentReply(questionId, comment.id, 0, amoutPerPage)
          .then((res) => {
            setCurrentPage(currentPage + 1);
            setReplies([...replies, ...res.data.data]);
          })
          .catch()
          .finally(() => {
            setLoadingReply(false);
          });
      }
    };

    const handleShowOption = () => {
      setShowOption(!isShowOption);
    };

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

    const handleSaveEditComment = async (id: string) => {
      const comment: CommentUpdateModel = {
        content: editContent,
      };
      UpdateQuestionComment(id, comment)
        .then((res) => {
          setContent(editContent);
          setEdit(false);
          openNotificationSuccess("Updated successfully");
        })
        .catch((error: AxiosError) => {
          FetchingErrorHandler(error, openNotificationFailure);
        });
    };

    const handleCancelEditComment = () => {
      setEditContent(content);
      setEdit(false);
    };

    const handleUpvote = () => {
      if (!isAuthenticated) {
        showRequireLogin();
        return;
      }

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

      UpVoteQuestionComment(comment.id).then().catch();
    };

    const handleDownvote = () => {
      if (!isAuthenticated) {
        showRequireLogin();
        return;
      }

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

      DownVoteQuestionComment(comment.id).then().catch();
    };

    const AddItsReply = (comment: CommentDetailModel) => {
      setReplies([...replies, comment]);
    };

    const handleDeleteComment = (id: string) => {
      DeleteQuestionComment(id)
        .then((res) => {
          setReplies(replies.filter((x) => x.id != id));
          openNotificationSuccess("Deleted successfully");
        })
        .catch((error: AxiosError) => {
          FetchingErrorHandler(error, openNotificationFailure);
        });
    };

    const openNotificationSuccess = (message: string) => {
      api.info({
        message: `Notification`,
        description: message,
        placement: "topRight",
      });
    };

    const openNotificationFailure = (message: string) => {
      api.error({
        message: `Notification`,
        description: message,
        placement: "topRight",
        type: "error",
      });
    };

    return (
      <div className='answer'>
        {contextHolder}
        <div className='answer-header'>
          <img
            src={comment.avatar ?? DefaultAvatar}
            alt='User Avatar'
            className='answer-header-avatar'
          />
        </div>
        <div className='answer-content'>
          {isEdit ? (
            <ReplyForm
              content={editContent}
              setContent={setEditContent}
              onSave={() => {
                return handleSaveEditComment(comment.id);
              }}
              onCancel={handleCancelEditComment}
              parentComment={null}
              isAuthenticated={isAuthenticated}
              showRequireLogin={showRequireLogin}
            />
          ) : (
            <div className='answer-content-container'>
              <div className='answer-content-left'>
                <div className='answer-content-details'>
                  <span className='answer-content-details-fullname'>
                    {comment.fullName}
                  </span>
                  <span className='answer-content-details-username'>
                    @{comment.userName}
                  </span>
                  <span className='answer-content-details-date'>
                    {formatDateToString(comment.createdDate)}
                  </span>
                </div>
                <div
                  className='answer-content-option'
                  ref={optionRef}
                  onClick={handleShowOption}
                >
                  <SlOptionsVertical />
                  <div
                    className={`answer-content-option-menu ${
                      isShowOption && "show"
                    }`}
                  >
                    <ul>
                      {!comment.isMyComment && (
                        <li className='answer-content-option-menu-item'>
                          <CiFlag1 />
                          <span>Report</span>
                        </li>
                      )}

                      {comment.isMyComment && (
                        <>
                          <li
                            className='answer-content-option-menu-item'
                            onClick={() => {
                              setEdit(true);
                            }}
                          >
                            <CiEdit /> <span>Edit</span>
                          </li>
                          <li
                            className='answer-content-option-menu-item'
                            onClick={() => {
                              console.log(comment);
                              setOnConfirm(() => () => {
                                onDelete(comment.id);
                              });
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <MdDeleteOutline />
                            <span>Delete</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className='answer-content-message'>
                {/* <Link to={`/user/profile/${"fill-later"}`}>
                  @{comment.replyFor}
                </Link>{" "}
                {content} */}
                <ContentDisplayer
                  content={
                    `[@${comment.replyFor}](${`/user/${comment.userId}`}) ` +
                    (content.startsWith(`\``) ? "\n" + content : content)
                  }
                />
              </div>
              <div className='answer-content-function'>
                <div className='answer-content-function-votes'>
                  <div
                    className={`answer-content-function-votes-up ${
                      vote == VoteType.Up && "selected"
                    }`}
                    onClick={handleUpvote}
                  >
                    <TiArrowSortedUp />
                    <span>{upvote}</span>
                  </div>
                  <div
                    className={`answer-content-function-votes-down ${
                      vote == VoteType.Down && "selected"
                    }`}
                    onClick={handleDownvote}
                  >
                    <TiArrowSortedDown />
                    <span>{downvote}</span>
                  </div>
                </div>
                <div
                  className='answer-content-function-reply'
                  onClick={handleReplyClick}
                >
                  Reply
                </div>
              </div>
            </div>
          )}

          {isReply && (
            <div className='answer-content-form'>
              <div className='answer-content-form-icon'>
                <ImReply />
              </div>
              <ReplyForm
                autoFocus
                content={addReply}
                setContent={setAddReply}
                onSave={handleReply}
                onCancel={handleCancelReply}
                parentComment={comment.id}
                isAuthenticated={isAuthenticated}
                showRequireLogin={showRequireLogin}
              />
            </div>
          )}

          {totalCommentCount > 0 && (
            <div
              className='answer-content-showComment'
              onClick={handleShowReplyClick}
            >
              <div
                className={`answer-content-showComment-button ${
                  showComment && "show"
                }`}
              >
                <TiArrowRight />
              </div>
              <div className='answer-content-showComment-label'>
                Show replies
              </div>
            </div>
          )}

          <div
            className={`answer-content-replies ${
              showComment && replies && "show"
            }`}
          >
            {replies &&
              replies.map((reply) => (
                <Answer
                  key={reply.id}
                  questionId={questionId}
                  parentId={comment.id}
                  comment={reply}
                  addParentComment={AddItsReply}
                  onDelete={handleDeleteComment}
                  setOnCancel={setOnCancel}
                  setOnConfirm={setOnConfirm}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                  isAuthenticated={isAuthenticated}
                  showRequireLogin={showRequireLogin}
                />
              ))}
            {isLoadingReply && (
              <div className='answer-content-loading'>
                <Spin />
              </div>
            )}
            {!isLoadingReply &&
              currentPage <=
                Math.ceil(totalCommentCount / amoutPerPage) - 1 && (
                <div
                  className='answer-content-replies-more'
                  onClick={handleLoadMoreReplies}
                >
                  Show more comments...
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
);

interface ReplyFormProps {
  onSave: () => Promise<void>;
  onCancel: () => void;
  content: string;
  autoFocus?: boolean;
  parentComment: string | null;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  showRequireLogin: () => void;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({
  onSave,
  onCancel,
  autoFocus,
  content,
  setContent,
  isAuthenticated,
  showRequireLogin,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const handleSavePost = async () => {
    if (isAuthenticated) {
      if (!loading) {
        setLoading(true);
        onSave()
          .then(() => {
            openNotificationSuccess("Post successful");
          })
          .catch((error: AxiosError) => {
            FetchingErrorHandler(error, openNotificationFailure);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      showRequireLogin();
    }
  };

  const openNotificationSuccess = (message: string) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  return (
    <div className='answer-reply-form'>
      {contextHolder}
      <div className='answer-reply-form-text'>
        <BasicEditor setValue={setContent} value={content} />
      </div>
      <div className='answer-reply-form-function'>
        <button
          className='answer-reply-form-function-save'
          onClick={handleSavePost}
          disabled={content.length === 0}
        >
          Save changes
          {loading && <Spin className='answer-reply-form-function-save-spin' />}
        </button>
        <button
          className='answer-reply-form-function-cancel'
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export interface AnswerTreeProps {
  questionId: string; //for create reply
  userName: string; //for create reply
  data: CommentDetailModel[];
  page: number;
  amount: number;
  totalCount: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AnswerTree = ({
  questionId,
  userName,
  data,
  page,
  amount,
  totalCount,
  setPage,
}: AnswerTreeProps) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [answers, setAnswers] = useState<CommentDetailModel[]>([]);
  const [reply, setReply] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isRequiredLogin, setRequiredLogin] = useState(false);
  const dispatch = useDispatch();

  const handleOnAddComment = async () => {
    const comment: CommentCreateModel = {
      content: reply,
      parentId: null,
      replyFor: userName,
      postId: questionId,
    };

    await AddQuestionComment(comment)
      .then((res) => {
        console.log(res.data);
        setAnswers([res.data, ...answers]);
      })
      .catch();
    setReply("");
  };

  const handleDeleteComment = (id: string) => {
    DeleteQuestionComment(id)
      .then((res) => {
        setAnswers(answers.filter((x) => x.id != id));
        openNotificationSuccess("Deleted successfully");
      })
      .catch((error: AxiosError) => {
        FetchingErrorHandler(error, openNotificationFailure);
      });
  };

  const handleOnCancelComment = () => {
    setReply("");
  };

  useEffect(() => {
    setAnswers(data);
  }, [data]);

  const onChangePage = (page: number, pageSize: Number) => {
    setPage(page);
  };

  const openNotificationSuccess = (message: string) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  const [onConfirm, setOnConfirm] = useState(() => () => {
    console.log("state");
  });
  const [onCancel, setOnCancel] = useState(() => () => {
    setShowDeleteConfirm(false);
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCloseRequiredLogin = () => {
    setRequiredLogin(false);
  };

  const showRequireLogin = () => {
    setRequiredLogin(true);
  };

  return (
    <div className='answers-tree'>
      {contextHolder}
      <div className='answers-tree-new'>
        <ReplyForm
          content={reply}
          setContent={setReply}
          onSave={handleOnAddComment}
          onCancel={handleOnCancelComment}
          parentComment={null}
          isAuthenticated={isAuthenticated}
          showRequireLogin={showRequireLogin}
        />
      </div>
      {answers.length > 0 ? (
        <div className='answers-tree-list'>
          {answers.map((answer) => (
            <Answer
              key={answer.id}
              questionId={questionId}
              parentId={answer.id}
              comment={answer}
              onDelete={handleDeleteComment}
              setOnConfirm={setOnConfirm}
              setOnCancel={setOnCancel}
              setShowDeleteConfirm={setShowDeleteConfirm}
              isAuthenticated={isAuthenticated}
              showRequireLogin={showRequireLogin}
            />
          ))}
          <div className='answers-tree-list-pagination'>
            <Pagination
              simple
              defaultCurrent={1}
              pageSize={amount}
              total={totalCount}
              onChange={onChangePage}
              current={page}
            />
          </div>
        </div>
      ) : (
        <div className='answers-tree-empty'>
          <p>This question has no answers</p>
        </div>
      )}
      <ConfirmDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        title='You are about to delete this comment'
        message='Do you really want to delete this comment? This action cannot be undone. Are you sure you want to proceed?'
        show={showDeleteConfirm}
      />
      <RequiredLogin
        show={isRequiredLogin}
        handleClose={handleCloseRequiredLogin}
      />
    </div>
  );
};

export default React.memo(AnswerTree);
