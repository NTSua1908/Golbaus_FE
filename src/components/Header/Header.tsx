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
  const [notifications, setNotification] = useState<NotificationProps[]>([
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "upvoted your post",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: false,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "followed you",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: false,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "has responded to your comment",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: true,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "commented on your post",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: false,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "has responded to your comment",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: true,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "commented on your post",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: false,
    },
    {
      user: "@Halley",
      userUrl: "#",
      avatarUrl:
        "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
      content: "commented on your post",
      date: "2023-12-04 10:12 PM",
      link: "#",
      isRead: false,
    },
  ]);
  const menuProfileRef = useRef<HTMLDivElement>(null);
  const buttonProfileRef = useRef<HTMLImageElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonNotificationRef = useRef<HTMLDivElement>(null);

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

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeBaseInfo());
    dispatch(logout());
    navigate("/login");
  };

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
                <Link to={"/QuestionAndAnswer"}>Questions and Answers</Link>
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
                navigate("/search");
              }}
            >
              <FaSearch />
            </li>
            {isAuthenticated && userInfo && (
              <li>
                <Link
                  to={"/create-post"}
                  className='header-menu-right-write pointer'
                  title='Write post'
                >
                  <FaPen />
                </Link>
              </li>
            )}
            {isAuthenticated && userInfo && (
              <li className='header-menu-right-notification'>
                <div onClick={toggleNotification} ref={buttonNotificationRef}>
                  <div className='header-menu-right-notification-count'>
                    {notifications.length}
                  </div>
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
                    <span className='header-menu-right-notification-menu-header-read pointer'>
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
                            to={notification.link}
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
                                to={notification.userUrl}
                                className='user-avatar'
                              >
                                <img
                                  src={notification.avatarUrl}
                                  alt={`${notification.user}'s avatar`}
                                />
                              </Link>
                              <div className='notification-content'>
                                <p>
                                  <a
                                    href={notification.userUrl}
                                    className='user-link'
                                  >
                                    {notification.user}
                                  </a>{" "}
                                  {notification.content}
                                  {"."}
                                </p>
                                <span className='date'>
                                  {notification.date}
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
                      <li>
                        <IoNewspaperOutline
                          className='padding-icon'
                          onClick={() => {
                            navigate("/profile#post");
                          }}
                        />
                        Posts management
                      </li>
                      <li>
                        <FaQuestionCircle
                          className='padding-icon'
                          onClick={() => {
                            navigate("/profile#question");
                          }}
                        />
                        Questions management
                      </li>
                      <li>
                        <FaBookmark
                          className='padding-icon'
                          onClick={() => {
                            navigate("/profile#bookmarked");
                          }}
                        />
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
