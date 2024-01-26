import { Spin, notification } from "antd";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiBookmark, CiEdit, CiFlag1 } from "react-icons/ci";
import {
  FaBookmark,
  FaCheck,
  FaFacebook,
  FaQuestionCircle,
  FaRegEye,
  FaRocketchat,
} from "react-icons/fa";
import { FaRedditAlien, FaSquareXTwitter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { SlOptionsVertical, SlUserFollow } from "react-icons/sl";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { formatDayAgo } from "../../Helper/DateHelper";
import VotePost from "../../enums/VoteType";
import { QuestionDetailModel } from "../../model/questionModel";
import {
  Delete,
  DownVote,
  ToggleAddBookmark,
  UpVote,
} from "../../services/QuestionService";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import DisplayTags from "../DisplayTag/DisplayTags";
import ContentDisplayer from "../ShowCode/ContentDisplayer";
import "./questionContent.scss";
import { ToggleFollow } from "../../services/AccountService";

interface QuestionContentProps {
  id: string;
  question: QuestionDetailModel;
  handleOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuestionContent({
  id,
  question,
  handleOpenModal,
}: QuestionContentProps) {
  const [isUpvote, setUpvote] = useState(question.vote == VotePost.Up);
  const [isDownvote, setDownvote] = useState(question.vote == VotePost.Down);
  const [voteCount, setVoteCount] = useState(question.voteCount);
  const [isOpenOption, setOpenOption] = useState(false);
  const menuOptionRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [marked, setMarked] = useState(question.isMarked);
  const [markLoading, setMarkLoading] = useState(false);
  const [follow, setFollow] = useState(question.isFollowing);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOptionRef.current &&
        !menuOptionRef.current.contains(event.target as Node)
      ) {
        setOpenOption(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuOptionOpen = () => {
    setOpenOption((prev) => !prev);
  };

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }
    setUpvote((prev) => !prev);
    setDownvote(false);

    let newVoteCount = voteCount;
    if (isUpvote) {
      newVoteCount = newVoteCount - 1;
    } else if (isDownvote) {
      newVoteCount = newVoteCount + 2;
    } else {
      newVoteCount = newVoteCount + 1;
    }
    setVoteCount(newVoteCount);

    await UpVote(id)
      .then()
      .catch((error: AxiosError) => {});
  };

  const handleDownvote = async () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }

    setDownvote((prev) => !prev);
    setUpvote(false);
    let newVoteCount = voteCount;
    if (isDownvote) {
      newVoteCount = newVoteCount + 1;
    } else if (isUpvote) {
      newVoteCount = newVoteCount - 2;
    } else {
      newVoteCount = newVoteCount - 1;
    }
    setVoteCount(newVoteCount);
    await DownVote(id)
      .then()
      .catch((error: AxiosError) => {});
  };

  const gotoEditPage = () => {
    navigate("/edit-question/" + id);
  };

  const handleShowDeletePostConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const onDeletePost = async () => {
    await Delete(id)
      .then((res) => {
        openNotificationSuccess("Delete successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error: AxiosError) => {
        const errors = (error.response?.data as any).errors;
        const errorMessage = errors.join("\n") as string;
        openNotificationFailure(errorMessage);
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

  const handleFollowUser = () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }

    if (!followLoading) {
      setFollowLoading(true);
      ToggleFollow(question.userId)
        .then(() => {
          setFollow((prev) => !prev);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setFollowLoading(false);
        });
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }

    if (!markLoading) {
      setMarkLoading(true);
      ToggleAddBookmark(id)
        .then(() => {
          setMarked((prev) => !prev);
          if (!marked) {
            openNotificationSuccess("Marked successfully");
          } else {
            openNotificationSuccess("Unmarked successfully");
          }
        })
        .catch((error: AxiosError) => {
          openNotificationFailure("Something went wrong");
        })
        .finally(() => {
          setMarkLoading(false);
        });
    }
  };

  return (
    <div className='questionContent'>
      {contextHolder}
      <div className='questionContent-container'>
        <div className='questionContent-header'>
          <div className='questionContent-header-left'></div>
          <div className='questionContent-header-middle'></div>
          <div className='questionContent-header-right'></div>
        </div>
        <div className='questionContent-body'>
          <div className='questionContent-body-left'>
            <div
              className={`questionContent-body-left-up ${
                isUpvote && "selected"
              }`}
              title='Upvote'
              onClick={() => {
                handleUpvote();
              }}
            >
              <TiArrowSortedUp />
            </div>
            <div className='questionContent-body-left-count'>
              {voteCount > 0 && "+"}
              {voteCount}
            </div>
            <div
              className={`questionContent-body-left-down ${
                isDownvote && "selected"
              }`}
              title='Downvote'
              onClick={() => {
                handleDownvote();
              }}
            >
              <TiArrowSortedDown />
            </div>
            <div className='questionContent-body-left-avatar'>
              <img src={question.avatar} alt='User Avatar' />
            </div>
            <div className='questionContent-body-left-media'>
              <div
                className='questionContent-body-left-media-container'
                title='Share the link to this page on Reddit'
              >
                <FaRedditAlien />
              </div>
              <div
                className='questionContent-body-left-media-container'
                title='Share the link to this page on Facebook'
              >
                <FaFacebook />
              </div>
              <div
                className='questionContent-body-left-media-container'
                title='Share the link to this page on X'
              >
                <FaSquareXTwitter />
              </div>
            </div>
          </div>
          <div className='questionContent-body-middle'>
            <div className='questionContent-body-middle-header'>
              <div className='questionContent-body-middle-header-info'>
                <div className='question-user-info'>
                  <img
                    className='question-user-info-avatar'
                    src={question.avatar}
                    alt='User Avatar'
                  />
                  <div className='question-user-info-details'>
                    <div className='question-user-info-details-name'>
                      <h2
                        className='fullname'
                        onClick={() => {
                          navigate("/user/" + question.userId);
                        }}
                      >
                        {question.fullName}
                      </h2>
                      <p
                        className='username'
                        onClick={() => {
                          navigate("/user/" + question.userId);
                        }}
                      >
                        @{question.userName}
                      </p>
                      <div
                        className='question-user-info-details-name-btnfollow'
                        onClick={handleFollowUser}
                      >
                        Follow{" "}
                        {followLoading ? (
                          <Spin className='question-user-info-details-name-btnfollow-spin' />
                        ) : !follow ? (
                          <GoPlus />
                        ) : (
                          <FaCheck />
                        )}
                      </div>
                    </div>
                    <div className='question-user-info-details-more'>
                      <div className='question-user-info-details-more-question'>
                        <FaQuestionCircle />
                        <span className='question-user-info-details-more-question-count'>
                          {question.questionCount}
                        </span>
                        <span className='question-user-info-details-more-question-label'>
                          Questions
                        </span>
                      </div>
                      <div className='question-user-info-details-more-follow'>
                        <SlUserFollow />
                        <span className='question-user-info-details-more-follow-count'>
                          {question.followCount}
                        </span>
                        <span className='question-user-info-details-more-follow-label'>
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='question-info'>
                  <div className='question-info-container'>
                    <div className='question-info-date'>
                      {!question.updatedDate &&
                        "Posted at " + formatDayAgo(question.createdDate)}
                      {question.updatedDate &&
                        "Updated at " + formatDayAgo(question.updatedDate)}
                    </div>
                    <div className='question-info-more'>
                      <div className='question-info-more-view'>
                        <FaRegEye />
                        <span className='question-info-more-view-count'>
                          {question.viewCount}
                        </span>
                        <span className='question-info-more-view-label'>
                          Views
                        </span>
                      </div>
                      <div className='question-info-more-comment'>
                        <FaRocketchat />
                        <span className='question-info-more-comment-count'>
                          {question.answerCount}
                        </span>
                        <span className='question-info-more-comment-label'>
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className='question-info-option'
                    onClick={handleMenuOptionOpen}
                    ref={menuOptionRef}
                  >
                    <SlOptionsVertical />
                    <div
                      className={`question-info-option-menu ${
                        isOpenOption && "show"
                      }`}
                    >
                      <ul>
                        <li
                          className='question-info-option-menu-item'
                          onClick={handleBookmark}
                        >
                          {!marked && (
                            <>
                              <CiBookmark /> <span>Mark</span>
                            </>
                          )}
                          {marked && (
                            <>
                              <FaBookmark style={{ color: "violet" }} />{" "}
                              <span>Marked</span>
                            </>
                          )}
                        </li>
                        <li className='question-info-option-menu-item'>
                          <CiFlag1 /> <span>Report</span>
                        </li>
                        {question.isMyQuestion && (
                          <>
                            <li
                              className='question-info-option-menu-item'
                              onClick={gotoEditPage}
                            >
                              <CiEdit /> <span>Edit</span>
                            </li>
                            <li
                              className='question-info-option-menu-item'
                              onClick={handleShowDeletePostConfirm}
                            >
                              <MdDeleteOutline /> <span>Delete</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='questionContent-body-middle-body'>
              <h1 className='questionContent-body-middle-body-title'>
                {question.title}
              </h1>
              <ContentDisplayer content={question.content} />
              <div className='questionContent-body-middle-body-tags'>
                <DisplayTags tags={question.tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        onCancel={() => {
          setShowDeleteConfirm(false);
        }}
        onConfirm={onDeletePost}
        title='You are about to delete this question'
        message='Do you really want to delete this question? This action cannot be undone. Are you sure you want to proceed?'
        show={showDeleteConfirm}
      />
    </div>
  );
}

export default QuestionContent;
