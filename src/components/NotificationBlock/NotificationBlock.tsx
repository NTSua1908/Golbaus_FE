import React, { useEffect, useRef, useState } from "react";
import { NotificationModel } from "../../model/notificationModel";
import { Link, useNavigate } from "react-router-dom";
import { formatDateToString } from "../../Helper/DateHelper";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import "./notificationBlock.scss";
import { notificationLinkResolver } from "../../Helper/NotificationHelper";
import { MarkRead } from "../../services/NotificationService";

interface NotificationBlockProps {
  notification: NotificationModel;
  handleMarkRead: (id: string) => void;
  handleMarkUnread: (id: string) => void;
  handleDelete: (id: string) => void;
}

function NotificationBlock({
  notification,
  handleMarkRead,
  handleMarkUnread,
  handleDelete,
}: NotificationBlockProps) {
  const [showOption, setShowOption] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleShowOption = () => {
    setShowOption(true);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef && !menuRef.current?.contains(e.target as Node)) {
        setShowOption(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const goToIssue = () => {
    navigate(notificationLinkResolver(notification.issueId, notification.type));
  };

  return (
    <div className='notificationBlock'>
      <div
        className={`notificationBlock-item ${!notification.isRead && "unread"}`}
        onClick={goToIssue}
      >
        <Link
          to={"/user/profile/" + notification.userId}
          className='notificationBlock-item-avatar'
        >
          <img
            src={notification.avatar}
            alt={`${notification.avatar}'s avatar`}
          />
        </Link>
        <div className='notificationBlock-item-content'>
          <p>
            <Link
              to={"/user/" + notification.userId}
              className='notificationBlock-item-userLink'
            >
              {notification.userName}
            </Link>{" "}
            {notification.content}
          </p>
          <span className='notificationBlock-item-date'>
            {formatDateToString(notification.createdDate)}
          </span>
        </div>
      </div>
      <div className='notificationBlock-options'>
        <div
          className='notificationBlock-options-icon'
          ref={menuRef}
          onClick={handleShowOption}
        >
          <SlOptionsVertical />
        </div>
        <ul
          className={`notificationBlock-options-menu ${showOption && "show"}`}
        >
          {notification.isRead && (
            <li
              className='notificationBlock-options-menu-item'
              onClick={() => {
                handleMarkUnread(notification.id);
              }}
            >
              <FaRegEye /> Mark as Unread
            </li>
          )}
          {!notification.isRead && (
            <li
              className='notificationBlock-options-menu-item'
              onClick={() => {
                handleMarkRead(notification.id);
              }}
            >
              <FaRegEye /> Mark as Read
            </li>
          )}
          <li
            className='notificationBlock-options-menu-item'
            onClick={() => {
              handleDelete(notification.id);
            }}
          >
            <MdDeleteOutline /> Delete
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NotificationBlock;
