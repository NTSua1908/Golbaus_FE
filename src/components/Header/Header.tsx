import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Logo } from "../../Logo";
import "./header.scss";
import { ConfigProvider, Drawer, Spin } from "antd";
import {
  IoLogOutSharp,
  IoNewspaperOutline,
  IoPerson,
  IoSearchSharp,
} from "react-icons/io5";
import {
  FaPen,
  FaBell,
  FaHistory,
  FaSearch,
  FaBookmark,
  FaQuestionCircle,
} from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetByToken } from "../../services/AccountService";
import { removeBaseInfo, setBaseInfo } from "../../actions/accountAction";
import { Logout as HandleLogout } from "../../services/AuthService";
import { logout } from "../../actions/loginAction";
import DefaultAvatar from "../../images/default_avatar.png";
import InputSearch from "../InputSearch/InputSearch";
import {
  GetAllNotificationByToken,
  MarkAllRead,
} from "../../services/NotificationService";
import { AxiosError } from "axios";
import { NotificationModel } from "../../model/notificationModel";
import { formatDayAgo } from "../../Helper/DateHelper";
import { notificationLinkResolver } from "../../Helper/NotificationHelper";
import { FetchingErrorHandler } from "../../Helper/FetchingErrorHandler";

interface NotificationProps {
  user: string;
  userUrl: string;
  avatarUrl: string;
  content: string;
  date: string;
  link: string;
  isRead: boolean;
}

function Header() {
  const [isMenuProfileOpen, setMenuProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isWriteOpen, setWriteOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const menuProfileRef = useRef<HTMLDivElement>(null);
  const buttonProfileRef = useRef<HTMLImageElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonNotificationRef = useRef<HTMLDivElement>(null);

  const writeRef = useRef<HTMLLIElement>(null);

  const location = useLocation();
  const [searchText, setSearchText] = useState(
    new URLSearchParams(location.search).get("searchText") ?? ""
  );

  const userInfo = useSelector((state: RootState) => state.account.BasicInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuProfileRef.current &&
        !menuProfileRef.current.contains(event.target as Node) &&
        buttonProfileRef.current !== event.target
      ) {
        setMenuProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        buttonNotificationRef.current !== event.target &&
        !buttonNotificationRef.current?.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }

      if (
        writeRef.current &&
        !writeRef.current.contains(event.target as Node)
      ) {
        setWriteOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setMenuProfileOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  const toggleWriteMneu = () => {
    setWriteOpen((prev) => !prev);
  };

  const isAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      GetByToken()
        .then((res) => {
          dispatch(setBaseInfo(res.data));
        })
        .catch((error) => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const getNotification = async () => {
    await GetAllNotificationByToken(false, null, null, null, [], 0, 10)
      .then((res) => {
        setNotifications(res.data.data);
        setNotificationCount(
          (res.data.data as NotificationModel[]).reduce(
            (unreadCount, notification) =>
              (unreadCount += notification.isRead ? 0 : 1),
            0
          )
        );
      })
      .catch((error: AxiosError) => {});
  };

  useEffect(() => {
    getNotification().then().catch();
    const intervalId = setInterval(() => {
      getNotification();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeBaseInfo());
    dispatch(logout());
    navigate("/login");
  };

  const handleMarkAllNotificationRead = () => {
    MarkAllRead()
      .then(() => {
        setNotifications(
          notifications.map((x) => {
            return { ...x, isRead: true };
          })
        );
        setNotificationCount(0);
      })
      .catch((error: AxiosError) => {});
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get("searchText") ?? "";
    setSearchText(searchText);
  }, [location.search]);

  return (
    <div className='header'>
      <div className='header-container'>
        <Link to={"/"} className='header-logo'>
          <Logo />
        </Link>
        <div className='header-menu'>
          <div className='header-menu-left'>
            <ul>
              <li className='pointer'>
                <Link to={"/Post"}>Posts</Link>
              </li>
              <li className='pointer'>
                <Link to={"/Question"}>Questions and Answers</Link>
              </li>
            </ul>
          </div>
          <div className='header-menu-right'>
            <li className='header-menu-right-search'>
              <InputSearch setValue={setSearchText} value={searchText} />
            </li>
            <li
              className='header-menu-right-searchbutton pointer'
              title='Search'
              onClick={() => {
                navigate("/Search");
              }}
            >
              <FaSearch />
            </li>
            {isAuthenticated && userInfo && (
              <li
                className='header-menu-right-write'
                ref={writeRef}
                onClick={toggleWriteMneu}
              >
                <FaPen />
                <div
                  className={`header-menu-right-write-menu ${
                    isWriteOpen && "show"
                  }`}
                >
                  <Link
                    to={"/create-post"}
                    className='header-menu-right-write-menu-item pointer'
                    title='Write post'
                  >
                    <IoNewspaperOutline />
                  </Link>
                  <div className='header-menu-right-write-menu-divider'></div>
                  <Link
                    to={"/create-question"}
                    className='header-menu-right-write-menu-item pointer'
                    title='Write question'
                  >
                    <FaQuestionCircle />
                  </Link>
                </div>
              </li>
            )}
            {isAuthenticated && userInfo && (
              <li className='header-menu-right-notification'>
                <div onClick={toggleNotification} ref={buttonNotificationRef}>
                  {notificationCount != 0 && (
                    <div className='header-menu-right-notification-count'>
                      {notificationCount}
                    </div>
                  )}
                  <FaBell className='pointer' />
                </div>
                <div
                  className={`header-menu-right-notification-menu ${
                    isNotificationOpen && "show"
                  }`}
                  ref={notificationRef}
                >
                  <div className='header-menu-right-notification-menu-header'>
                    <span className='header-menu-right-notification-menu-header-title pointer'>
                      Notifications
                    </span>
                    <span
                      className='header-menu-right-notification-menu-header-read pointer'
                      onClick={handleMarkAllNotificationRead}
                    >
                      Mark read
                    </span>
                  </div>
                  <div className='header-menu-right-notification-menu-body'>
                    {notifications.length === 0 && (
                      <div className='header-menu-right-notification-menu-body-empty '>
                        <span className='header-menu-right-notification-menu-body-empty-icon pointer'>
                          <GiEmptyHourglass />
                        </span>
                        <span className='header-menu-right-notification-menu-body-empty-content pointer'>
                          You have no notifications
                        </span>
                      </div>
                    )}
                    {notifications.length !== 0 && (
                      <div
                        className={`header-menu-right-notification-menu-body-list ${
                          isNotificationOpen && "show"
                        }`}
                      >
                        {notifications.map((notification, index) => (
                          <Link
                            to={notificationLinkResolver(
                              notification.issueId,
                              notification.type
                            )}
                            className='notification-container'
                            key={index}
                          >
                            <div
                              key={index}
                              className={`notification-item ${
                                !notification.isRead && "unread"
                              }`}
                            >
                              <Link
                                to={"/user/" + notification.userId}
                                className='user-avatar'
                              >
                                <img
                                  src={notification.avatar}
                                  alt={`${notification.userName}'s avatar`}
                                />
                              </Link>
                              <div className='notification-content'>
                                <p>
                                  <Link
                                    to={"/user/" + notification.userId}
                                    className='user-link'
                                  >
                                    {notification.userName}
                                  </Link>{" "}
                                  {notification.content}
                                </p>
                                <span className='date'>
                                  {formatDayAgo(notification.createdDate)}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='header-menu-right-notification-menu-footer'>
                    <span
                      className='pointer'
                      onClick={() => {
                        navigate("/profile#notification");
                      }}
                    >
                      All notifications
                    </span>
                  </div>
                </div>
              </li>
            )}
            {isAuthenticated && userInfo ? (
              <li className='header-menu-right-profile'>
                <div
                  className='header-menu-right-profile-container pointer'
                  onClick={toggleProfileMenu}
                >
                  <img
                    ref={buttonProfileRef}
                    className='header-menu-right-profile-image'
                    src={userInfo?.avatar ?? DefaultAvatar}
                    alt='Your profile'
                  />
                  {isMenuProfileOpen && userInfo && (
                    <div
                      className={`header-menu-right-profile-menu ${
                        isMenuProfileOpen && "show"
                      }`}
                      ref={menuProfileRef}
                    >
                      <li
                        className='header-menu-right-profile-menu-first'
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        {/* <Link to={"/profile"} style={{ display: "block" }}> */}
                        <div className='header-menu-right-profile-menu-first-left'>
                          <img
                            src={userInfo?.avatar ?? DefaultAvatar}
                            alt='Your profile'
                          />
                        </div>

                        <div className='header-menu-right-profile-menu-first-right'>
                          <div className='name'>{userInfo?.fullName}</div>
                          <div className='userName'>@{userInfo?.userName}</div>
                        </div>
                        {/* </Link> */}
                      </li>
                      <li
                        onClick={() => {
                          navigate("/user/" + userInfo.id);
                        }}
                      >
                        <IoPerson className='padding-icon' />
                        Personal page
                      </li>
                      <li
                        onClick={() => {
                          navigate("/profile#post");
                        }}
                      >
                        <IoNewspaperOutline className='padding-icon' />
                        Posts management
                      </li>
                      <li
                        onClick={() => {
                          navigate("/profile#question");
                        }}
                      >
                        <FaQuestionCircle className='padding-icon' />
                        Questions management
                      </li>
                      <li
                        onClick={() => {
                          navigate("/profile#bookmarked");
                        }}
                      >
                        <FaBookmark className='padding-icon' />
                        Bookmarked
                      </li>
                      <li onClick={handleLogout}>
                        <IoLogOutSharp className='padding-icon' />
                        Logout
                      </li>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <div className='header-menu-right-auth'>
                <Link
                  to={"/login"}
                  state={{ returnPath: window.location.pathname }}
                >
                  Login
                </Link>{" "}
                - <Link to={"/register"}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
