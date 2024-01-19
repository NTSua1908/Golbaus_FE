import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Pagination,
  PaginationProps,
  Select,
  Spin,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import {
  FaBell,
  FaBookmark,
  FaCamera,
  FaFilter,
  FaQuestionCircle,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  validateFullname,
  validatePassword,
} from "../../Helper/InformationValidater";
import { Logo } from "../../Logo";
import { ImageUploaded } from "../../components/BasicEditor/BasicEditor";
import NotificationFilter from "../../components/Filter/NotificationFilter/NotificationFilter";
import PostFilter from "../../components/Filter/PostFilter/PostFilter";
import MenuLeft, { MenuItem } from "../../components/MenuLeft/MenuLeft";
import NotificationBlock from "../../components/NotificationBlock/NotificationBlock";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import Gender from "../../enums/Gender";
import { ProfileMenu } from "../../enums/ProfileMenu";
import DefaultAvatar from "../../images/default_avatar.png";
import {
  NotificationFilter as NotificationFilterProps,
  NotificationModel,
} from "../../model/notificationModel";
import { PostFilter as FilterProps, PostList } from "../../model/postModel";
import { QuestionListModel } from "../../model/questionModel";
import {
  deleteImage,
  resizeAndUploadImage,
} from "../../services/FireBaseService";
import { RootState } from "../../store/configureStore";
import "./myProfile.scss";
import {
  GetByToken,
  GetDetailByToken,
  UpdateAvatarByToken,
  UpdateUserByToken,
} from "../../services/AccountService";
import { AxiosError } from "axios";
import { convertLinkToImageUploaded } from "../../Helper/ImageHelper";
import { setBaseInfo, updateAvatar } from "../../actions/accountAction";
import Module from "../../enums/Module";
import { UserUpdateByTokenModel } from "../../model/accountModel";
import { GetAllByToken } from "../../services/PostService";

function MyProfile() {
  const menuItems: MenuItem[] = [
    {
      title: "Profile",
      icon: <FaUser />,
      onClick: () => {
        setSelectedMenu(ProfileMenu.Profile);
      },
    },
    {
      title: "Posts",
      icon: <BsPostcard />,
      onClick: () => {
        setSelectedMenu(ProfileMenu.Posts);
      },
    },
    {
      title: "Question",
      icon: <FaQuestionCircle />,
      onClick: () => {
        setSelectedMenu(ProfileMenu.Question);
      },
    },
    {
      title: "Notification",
      icon: <FaBell />,
      onClick: () => {
        setSelectedMenu(ProfileMenu.Notification);
      },
    },
    {
      title: "Bookmarked",
      icon: <FaBookmark />,
      onClick: () => {
        setSelectedMenu(ProfileMenu.Bookmarked);
      },
    },
  ];

  const location = useLocation();

  const getFragment = (): ProfileMenu => {
    const fragment = location.hash;
    console.log(fragment);
    switch (fragment) {
      case "#post":
        return ProfileMenu.Posts;
      case "#question":
        return ProfileMenu.Question;
      case "#notification":
        return ProfileMenu.Notification;
      case "#bookmarked":
        return ProfileMenu.Bookmarked;
      default:
        return ProfileMenu.Profile;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(getFragment());

  const renderMenu = () => {
    switch (selectedMenu) {
      case ProfileMenu.Profile:
        return <PersonalInfo />;
      case ProfileMenu.Posts:
        return <PersonalPost />;
      case ProfileMenu.Question:
        return <PersonalQuestion />;
      case ProfileMenu.Notification:
        return <PersonalNotification />;
      case ProfileMenu.Bookmarked:
        return <PersonalBookmarked />;
      default:
        break;
    }
  };

  const userInfo = useSelector((state: RootState) => state.account.BasicInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = localStorage.getItem("token") !== null;
  useEffect(() => {
    if (isAuthenticated) {
      if (!userInfo) {
        GetByToken()
          .then((res) => {
            dispatch(setBaseInfo(res.data));
          })
          .catch((error) => {
            localStorage.removeItem("token");
          });
      }
    } else {
      // navigate("/");
    }
  }, []);

  return (
    <div className='myProfile'>
      <div className='myProfile-left'>
        <MenuLeft
          items={menuItems}
          avartar={userInfo?.avatar ?? DefaultAvatar}
          fullName={userInfo?.fullName ?? ""}
          userName={userInfo?.userName ?? ""}
          index={selectedMenu}
        />
      </div>
      <div className='myProfile-right'>
        {renderMenu()}
        <Link to={"/"} className='myProfile-right-logo'>
          <Logo />
        </Link>
      </div>
    </div>
  );
}

export default MyProfile;

const PersonalInfo = () => {
  const userInfo = useSelector((state: RootState) => state.account.BasicInfo);
  const [avatar, setAvatar] = useState<ImageUploaded[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.avatar)
      setAvatar([convertLinkToImageUploaded(userInfo.avatar, Module.User)]);
  }, [userInfo]);

  const dispatch = useDispatch();

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      //delete previous image
      setIsUploading(true);
      if (avatar.length > 0) {
        await deleteImage(avatar, (x) => {
          return true;
        });
        setAvatar([]);
      }
      await resizeAndUploadImage(
        files[0],
        null,
        avatar,
        setAvatar,
        Module.User,
        300
      )
        .then()
        .catch();
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (avatar.length > 0 && avatar[0].link != userInfo?.avatar) {
      UpdateAvatarByToken(avatar[0].link)
        .then((res) => {
          openNotificationSuccess("Profile picture updated successfully.");
        })
        .catch((error: AxiosError) => {
          const errors = (error.response?.data as any).errors;
          if (errors) {
            const errorMessage = errors.join("\n") as string;
            openNotificationFailure(errorMessage);
          }
        });
      dispatch(updateAvatar(avatar[0].link));
    }
  }, [avatar]);

  const [form] = Form.useForm();
  const isAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      GetDetailByToken()
        .then((res) => {
          console.log(res.data);
          form.setFieldsValue({
            fullName: res.data.fullName,
            userName: res.data.userName,
            email: res.data.email,
            dob: res.data.dob ? dayjs(res.data.dob) : null,
            dateJoined: dayjs(res.data.dateJoined),
            bio: res.data.bio,
            gender: Gender[res.data.gender],
          });
        })
        .catch((error: AxiosError) => {
          const errors = (error.response?.data as any).errors;

          if (errors) {
            const errorMessage = errors.join("\n") as string;
            openNotificationFailure(errorMessage);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [form]);

  const [api, contextHolder] = notification.useNotification();
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

  const onFinish = async (values: any) => {
    const updateData: UserUpdateByTokenModel = {
      fullName: values.fullName,
      bio: values.bio,
      dob: values.dob ? (values.dob as Dayjs).toDate() : null,
      gender: Gender[values.gender as keyof typeof Gender],
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    await UpdateUserByToken(updateData)
      .then((res) => {
        openNotificationSuccess("Updated successfully");
        GetByToken()
          .then((res) => {
            dispatch(setBaseInfo(res.data));
          })
          .catch((error) => {
            localStorage.removeItem("token");
          });
      })
      .catch((error: AxiosError) => {
        const errors = (error.response?.data as any).errors;
        if (errors) {
          const errorMessage = errors.join("\n") as string;
          openNotificationFailure(errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = () => {
    form.submit();
  };

  return (
    <div className='myProfile-right-container'>
      {contextHolder}
      <div className='myProfile-right-header'>Personal Information</div>
      <div className='myProfile-right-content info'>
        <div className='myProfile-right-content-left'>
          <div className='myProfile-right-content-left-avatar'>
            <img src={avatar[0]?.link ?? DefaultAvatar} alt='' />
            <label
              className='myProfile-right-content-left-avatar-icon'
              htmlFor='profile-avatar-input'
              title='Change avatar'
            >
              <FaCamera />
            </label>
            <input
              type='file'
              id='profile-avatar-input'
              accept='image/*'
              onChange={onAvatarChange}
              style={{ display: "none" }}
            />
          </div>
          <div
            className='myProfile-right-content-left-button'
            onClick={handleSave}
          >
            <span style={{ marginRight: "5px" }}>Save</span> <FaSave />
          </div>
          {isUploading && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Uploading...
            </div>
          )}
        </div>
        <div className='myProfile-right-content-right'>
          <Form
            form={form}
            className='update-form'
            name='update'
            onFinish={onFinish}
          >
            <div className='myProfile-right-content-container'>
              <div className='myProfile-right-content-container-right'>
                <label
                  className='myProfile-right-content-label'
                  htmlFor='fullname'
                >
                  Full name
                </label>
                <Form.Item
                  name='fullName'
                  rules={[
                    { required: true, message: "Please input your full name!" },
                    { validator: validateFullname },
                  ]}
                  hasFeedback
                >
                  <Input
                    name='fullname'
                    className='myProfile-right-content-input'
                    prefix={<UserOutlined />}
                    placeholder='Full name'
                    // value={fullName}
                    // onChange={onFullNameChange}
                  />
                </Form.Item>
                <label
                  className='myProfile-right-content-label'
                  htmlFor='username'
                >
                  Username
                </label>
                <Form.Item name='userName'>
                  <Input
                    name='username'
                    className='myProfile-right-content-input'
                    prefix={<UserOutlined />}
                    placeholder='Username'
                    // value={username}
                    // onChange={onUserNameChange}
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
            <div className='myProfile-right-content-container evenly'>
              <div className='myProfile-right-content-container-left'>
                <label
                  className='myProfile-right-content-label'
                  htmlFor='email'
                >
                  Email
                </label>
                <Form.Item name='email'>
                  <Input
                    name='email'
                    className='myProfile-right-content-input'
                    prefix={<MailOutlined />}
                    // placeholder='Email'
                    // value={email}
                    disabled
                  />
                </Form.Item>
              </div>
              <div className='myProfile-right-content-container-right'>
                <label
                  className='myProfile-right-content-label'
                  htmlFor='datejoined'
                >
                  Date joined
                </label>
                <Form.Item name='dateJoined'>
                  <DatePicker
                    name='datejoined'
                    className='myProfile-right-content-input'
                    placeholder='Date joined'
                    // value={dateJoined}
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
            <div className='myProfile-right-content-container evenly'>
              <div className='myProfile-right-content-container-left'>
                <label className='myProfile-right-content-label' htmlFor='dob'>
                  Date of birth
                </label>
                <Form.Item name='dob'>
                  <DatePicker
                    name='dob'
                    className='myProfile-right-content-input'
                    placeholder='Date of birth'
                    // value={dob}
                    // onChange={setDoB}
                  />
                </Form.Item>
              </div>

              <div className='myProfile-right-content-container-right'>
                <label className='myProfile-right-content-label'>Gender</label>
                <Form.Item name='gender'>
                  <Select
                    className='myProfile-right-content-input'
                    // defaultValue={Gender[gender]}
                    style={{ width: 120 }}
                    // onChange={handleChange}
                    options={[
                      { value: Gender[0], label: Gender[0] },
                      { value: Gender[1], label: Gender[1] },
                      { value: Gender[2], label: Gender[2] },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='myProfile-right-content-container-bio'>
              <label className='myProfile-right-content-label' htmlFor='bio'>
                Bio
              </label>
              <Form.Item name='bio'>
                <TextArea name='bio' placeholder='Bio' />
              </Form.Item>
            </div>
            <label className='myProfile-right-content-label' htmlFor='password'>
              Password
            </label>
            <Form.Item
              name='password'
              rules={[{ validator: validatePassword }]}
              hasFeedback
            >
              <Input.Password
                className='register-form-input'
                prefix={<LockOutlined />}
                placeholder='Password'
              />
            </Form.Item>
            <label
              className='myProfile-right-content-label'
              htmlFor='confirmPassword'
            >
              Confirm Password
            </label>
            <Form.Item
              name='confirmPassword'
              dependencies={["password"]}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className='register-form-input'
                prefix={<LockOutlined />}
                placeholder='Confirm password'
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const PersonalPost = () => {
  const [posts, setPosts] = useState<PostList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //filter state
  const [filter, setFilter] = useState<FilterProps>({
    title: "",
    tags: [],
    dateFrom: null,
    dateTo: null,
    orderBy: null,
    orderType: null,
    user: "", //Not used
  });

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handlePageSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    setCurrentPage(0);
    if (currentPage == 1) {
      getData();
    }
  };

  const onFilter = () => {
    setCurrentPage(1);
    if (currentPage == 1) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [pageSize, currentPage]);

  const getData = () => {
    if (!loading) {
      setLoading(true);
      GetAllByToken(
        filter.title,
        filter.tags,
        filter.orderBy,
        filter.orderType,
        filter.dateFrom ? filter.dateFrom.toDate() : null,
        filter.dateTo ? filter.dateTo.toDate() : null,
        currentPage - 1,
        pageSize
      )
        .then((res) => {
          setPosts(res.data.data);
          setTotalPage(res.data.totalCount);
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>My Posts</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Questions</h2>
          <div
            className={`myProfile-right-content-filterLeft-container ${
              posts.length == 0 && "fullHeight"
            }`}
          >
            {posts.length > 0 &&
              posts.map((post, index) => (
                <PostBlockList key={index} post={post} newTab />
              ))}
            {posts.length == 0 && (
              <div className='myProfile-right-content-filterLeft-container-nocontent'>
                <p>There are no posts</p>
              </div>
            )}
            {loading && <Spin fullscreen />}
          </div>
          <div className='myProfile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              pageSize={pageSize}
              total={totalPage}
              onChange={onChange}
              onShowSizeChange={handlePageSizeChange}
              hideOnSinglePage
            />
          </div>
        </div>
        <div className='myProfile-right-content-filterRight'>
          <div
            className={`myProfile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='myProfile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='myProfile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='myProfile-right-content-filterRight-toggle'
            onClick={handleShowFilter}
          >
            <FaFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalQuestion = () => {
  const [questions, setQuestion] = useState(questionData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const totalPage = 100;

  //filter state
  const [filter, setFilter] = useState<FilterProps>({
    title: "",
    tags: [],
    dateFrom: null,
    dateTo: null,
    orderBy: null,
    orderType: null,
    user: "", //Not used
  });

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const onFilter = () => {};

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>My Questions</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Questions</h2>
          <div className='myProfile-right-content-filterLeft-container'>
            {questions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
          </div>
          <div className='myProfile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='myProfile-right-content-filterRight'>
          <div
            className={`myProfile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='myProfile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='myProfile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='myProfile-right-content-filterRight-toggle'
            onClick={handleShowFilter}
          >
            <FaFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalBookmarked = () => {
  const [posts, setPosts] = useState(postData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const totalPage = 100;

  //filter state
  const [filter, setFilter] = useState<FilterProps>({
    title: "",
    tags: [],
    dateFrom: null,
    dateTo: null,
    orderBy: null,
    orderType: null,
    user: "", //Not used
  });

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const onFilter = () => {};

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>My Bookmarked</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Bookmarked</h2>
          <div className='myProfile-right-content-filterLeft-container'>
            {posts.map((post, index) => (
              <PostBlockList key={index} post={post} />
            ))}
          </div>
          <div className='myProfile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='myProfile-right-content-filterRight'>
          <div
            className={`myProfile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='myProfile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='myProfile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='myProfile-right-content-filterRight-toggle'
            onClick={handleShowFilter}
          >
            <FaFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalNotification = () => {
  const [notifications, setNotifications] = useState(notificationData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const totalPage = 100;

  //filter state
  const [filter, setFilter] = useState<NotificationFilterProps>({
    dateFrom: null,
    dateTo: null,
    notificationType: null,
    orderType: null,
    isRead: null,
  });

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const onFilter = () => {};

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>Notifications</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Notifications</h2>
          <div className='myProfile-right-content-filterLeft-container'>
            {notifications.map((notification, index) => (
              <NotificationBlock key={index} notification={notification} />
            ))}
          </div>
          <div className='myProfile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='myProfile-right-content-filterRight'>
          <div
            className={`myProfile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='myProfile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='myProfile-right-content-filterRight-container-filter'>
              <NotificationFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='myProfile-right-content-filterRight-toggle'
            onClick={handleShowFilter}
          >
            <FaFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

const questionData: QuestionListModel[] = [
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: "Gus",
    reputation: 23,
    viewCount: 123,
    commentCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
];

const postData: PostList[] = [
  {
    id: "18dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail:
      "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2020/08/782784.jpg",
    title: "Stardew Valley 1",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardew Valley 2",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc0c4a-13aa-4cc7-856e-09f0ac174146",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardew Valley 3",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title:
      "New mod for Stardev Valley, New mod for Stardev Valley, New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games, How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
];

const notificationData: NotificationModel[] = [
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "upVoted your post",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: false,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "followed you",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: false,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "has responded to your comment",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: true,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "commented on your post",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: false,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "has responded to your comment",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: true,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "commented on your post",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: false,
  },
  {
    user: "@Halley",
    userId: "#",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    content: "commented on your post",
    date: new Date(2023, 12, 12, 12, 45, 12),
    link: "#",
    isRead: false,
  },
];
