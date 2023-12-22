import React, { useEffect, useRef, useState } from 'react';
import { Logo } from '../../Logo';
import './header.scss';
import { ConfigProvider, Drawer, Spin } from 'antd';
import {
  IoLogOutSharp,
  IoNewspaperOutline,
  IoPerson,
  IoSearchSharp,
} from 'react-icons/io5';
import { FaPen, FaBell, FaHistory, FaSearch } from 'react-icons/fa';
import { GiEmptyHourglass } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { Link, useNavigate } from 'react-router-dom';
import { GetByToken } from '../../services/AccountService';
import { removeBaseInfo, setBaseInfo } from '../../actions/accountAction';
import { Logout as HandleLogout } from '../../services/AuthService';
import { logout } from '../../actions/loginAction';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuProfileOpen, setMenuProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotification] = useState<NotificationProps[]>([
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'upvoted your post',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: false,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'followed you',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: false,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'has responded to your comment',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: true,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'commented on your post',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: false,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'has responded to your comment',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: true,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'commented on your post',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: false,
    },
    {
      user: '@Halley',
      userUrl: '#',
      avatarUrl:
        'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
      content: 'commented on your post',
      date: '2023-12-04 10:12 PM',
      link: '#',
      isRead: false,
    },
  ]);
  const menuProfileRef = useRef<HTMLDivElement>(null);
  const buttonProfileRef = useRef<HTMLImageElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonNotificationRef = useRef<HTMLDivElement>(null);

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

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setMenuProfileOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  const isAuthenticated = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      GetByToken()
        .then((res) => {
          // debugger;
          dispatch(setBaseInfo(res.data));
          console.log('Get by token');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeBaseInfo());
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='header'>
      <Link
        to={'/'}
        className='header-logo'>
        <Logo />
      </Link>
      <div className='header-menu'>
        <div className='header-menu-left'>
          <ul>
            <li className='pointer'>Posts</li>
            <li className='pointer'>Questions and Answers</li>
          </ul>
        </div>
        <div className='header-menu-right'>
          <li className='header-menu-right-search'>
            <input
              type='text'
              className='header-menu-right-search-input'
            />
            <div className='header-menu-right-search-spin'>
              {isLoading && <Spin />}
            </div>
            <button className='header-menu-right-search-btn'>
              <IoSearchSharp />
            </button>
          </li>
          <li
            className='header-menu-right-searchbutton pointer'
            title='Search'>
            <FaSearch />
          </li>
          {isAuthenticated && userInfo && (
            <li
              className='header-menu-right-write pointer'
              title='Write post'>
              <FaPen />
            </li>
          )}
          {isAuthenticated && userInfo && (
            <li className='header-menu-right-notification'>
              <div
                onClick={toggleNotification}
                ref={buttonNotificationRef}>
                <div className='header-menu-right-notification-count'>
                  {notifications.length}
                </div>
                <FaBell className='pointer' />
              </div>
              <div
                className={`header-menu-right-notification-menu ${
                  isNotificationOpen && 'show'
                }`}
                ref={notificationRef}>
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
                        isNotificationOpen && 'show'
                      }`}>
                      {notifications.map((notification, index) => (
                        <a
                          href={notification.link}
                          className='notification-container'>
                          <div
                            key={index}
                            className={`notification-item ${
                              !notification.isRead && 'unread'
                            }`}>
                            <a
                              href={notification.userUrl}
                              className='user-avatar'>
                              <img
                                src={notification.avatarUrl}
                                alt={`${notification.user}'s avatar`}
                              />
                            </a>
                            <div className='notification-content'>
                              <p>
                                <a
                                  href={notification.userUrl}
                                  className='user-link'>
                                  {notification.user}
                                </a>{' '}
                                {notification.content}
                                {'.'}
                              </p>
                              <span className='date'>{notification.date}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className='header-menu-right-notification-menu-footer'>
                  <span className='pointer'>All notifications</span>
                </div>
              </div>
            </li>
          )}
          {isAuthenticated && userInfo ? (
            <li className='header-menu-right-profile'>
              <div
                className='header-menu-right-profile-container pointer'
                onClick={toggleProfileMenu}>
                <img
                  ref={buttonProfileRef}
                  className='header-menu-right-profile-image'
                  src={userInfo?.avatar as string}
                  alt='Your profile'
                />
                {isMenuProfileOpen && userInfo && (
                  <div
                    className={`header-menu-right-profile-menu ${
                      isMenuProfileOpen && 'show'
                    }`}
                    ref={menuProfileRef}>
                    <li className='header-menu-right-profile-menu-first'>
                      <div className='header-menu-right-profile-menu-first-left'>
                        <img
                          src='https://i.pinimg.com/564x/94/9b/8d/949b8d8d9229693ba9d53b054b738e2a.jpg'
                          alt='Your profile'
                        />
                      </div>

                      <div className='header-menu-right-profile-menu-first-right'>
                        <div className='name'>{userInfo?.fullName}</div>
                        <div className='userName'>@{userInfo?.userName}</div>
                      </div>
                    </li>
                    <li>
                      <IoPerson className='padding-icon' />
                      Personal page
                    </li>
                    <li>
                      <IoNewspaperOutline className='padding-icon' />
                      Content management
                    </li>
                    <li>
                      <FaHistory className='padding-icon' />
                      Activity history
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
              <Link to={'/login'}>Login</Link> -{' '}
              <Link to={'/register'}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
