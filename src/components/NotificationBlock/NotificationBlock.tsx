import React, { useEffect, useRef, useState } from "react";
import { NotificationModel } from "../../model/notificationModel";
import { Link } from "react-router-dom";
import { formatDateToString } from "../../Helper/DateHelper";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import "./notificationBlock.scss";

interface NotificationBlockProps {
  notification: NotificationModel;
}

function NotificationBlock({ notification }: NotificationBlockProps) {
  const [showOption, setShowOption] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <Link to={notification.link} className='notificationBlock'>
      <div
        className={`notificationBlock-item ${!notification.isRead && "unread"}`}
      >
        <Link
          to={"/user/profile/" + notification.userId}
          className='notificationBlock-item-avatar'
        >
          <img
            src={notification.avatar}
            alt={`${notification.user}'s avatar`}
          />
        </Link>
        <div className='notificationBlock-item-content'>
          <p>
            <Link
              to={"/user/profile/" + notification.userId}
              className='notificationBlock-item-userLink'
            >
              {notification.user}
            </Link>{" "}
            {notification.content}
            {"."}
          </p>
          <span className='notificationBlock-item-date'>
            {formatDateToString(notification.date)}
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
            <li className='notificationBlock-options-menu-item'>
              <FaRegEye /> Mark as Unread
            </li>
          )}
          {!notification.isRead && (
            <li className='notificationBlock-options-menu-item'>
              <FaRegEye /> Mark as Read
            </li>
          )}
          <li className='notificationBlock-options-menu-item'>
            <MdDeleteOutline /> Delete
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default NotificationBlock;
