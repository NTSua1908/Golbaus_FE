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
import { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
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
import { FetchingErrorHandler } from "../../Helper/FetchingErrorHandler";
import { convertLinkToImageUploaded } from "../../Helper/ImageHelper";
import {
  validateFullname,
  validatePassword,
} from "../../Helper/InformationValidater";
import { Logo } from "../../Logo";
import { setBaseInfo, updateAvatar } from "../../actions/accountAction";
import { ImageUploaded } from "../../components/BasicEditor/BasicEditor";
import NotificationFilter from "../../components/Filter/NotificationFilter/NotificationFilter";
import PostFilter from "../../components/Filter/PostFilter/PostFilter";
import MenuLeft, { MenuItem } from "../../components/MenuLeft/MenuLeft";
import NotificationBlock from "../../components/NotificationBlock/NotificationBlock";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import Gender from "../../enums/Gender";
import Module from "../../enums/Module";
import { ProfileMenu } from "../../enums/ProfileMenu";
import DefaultAvatar from "../../images/default_avatar.png";
import { UserUpdateByTokenModel } from "../../model/accountModel";
import {
  NotificationFilter as NotificationFilterProps,
  NotificationModel,
} from "../../model/notificationModel";
import { PostFilter as FilterProps, PostList } from "../../model/postModel";
import { QuestionListModel } from "../../model/questionModel";
import {
  GetByToken,
  GetDetailByToken,
  UpdateAvatarByToken,
  UpdateUserByToken,
} from "../../services/AccountService";
import {
  deleteImage,
  resizeAndUploadImage,
} from "../../services/FireBaseService";
import {
  Delete,
  GetAllNotificationByToken,
  MarkRead,
  MarkUnread,
} from "../../services/NotificationService";
import {
  GetAllPostBookmarkByToken,
  GetAllByToken as GetAllPostByToken,
} from "../../services/PostService";
import {
  GetAllQuestionBookmarkByToken,
  GetAllByToken as GetAllQuestionByToken,
} from "../../services/QuestionService";
import { RootState } from "../../store/configureStore";
import "./myProfile.scss";

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
      case "#info":
        return ProfileMenu.Profile;
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

  const navigate = useNavigate();

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
        .catch((error: AxiosError) => {
          FetchingErrorHandler(error, openNotificationFailure);
        });
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
          FetchingErrorHandler(error, openNotificationFailure);
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
      oldPassword: values.oldPassword,
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
        FetchingErrorHandler(error, openNotificationFailure);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = () => {
    form.submit();
  };

  useEffect(() => {
    navigate("#info");
  }, []);

  return (
    <div className='myProfile-right-container'>
      {contextHolder}
      <div className='myProfile-right-header'>Personal Information</div>
      {isLoading && <Spin fullscreen />}
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
            <div className='myProfile-right-content-changePassword'>
              <label
                className='myProfile-right-content-label'
                htmlFor='password'
              >
                Old Password
              </label>
              <Form.Item
                name='oldPassword'
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
                htmlFor='password'
              >
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
            </div>
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

  const navigate = useNavigate();
  useEffect(() => {
    navigate("#post");
  }, []);

  const getData = () => {
    if (!loading) {
      setLoading(true);
      GetAllPostByToken(
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
        .catch((error: AxiosError) => {})
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
          {loading && <Spin fullscreen />}
          {posts.length !== 0 && (
            <>
              <div
                className={`myProfile-right-content-filterLeft-container ${
                  posts.length == 0 && "fullHeight"
                }`}
              >
                {posts.length > 0 &&
                  posts.map((post, index) => (
                    <PostBlockList key={index} post={post} newTab />
                  ))}
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
            </>
          )}
          {!loading && posts.length == 0 && (
            <div className='myProfile-right-content-filterLeft-nocontent'>
              <p>There are no posts</p>
            </div>
          )}
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
  const [questions, setQuestion] = useState<QuestionListModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

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

  const navigate = useNavigate();
  useEffect(() => {
    navigate("#question");
  }, []);

  const getData = () => {
    if (!loading) {
      setLoading(true);
      GetAllQuestionByToken(
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
          setQuestion(res.data.data);
          setTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>My Questions</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Questions</h2>
          {loading && <Spin fullscreen />}
          {questions.length !== 0 && (
            <>
              <div className='myProfile-right-content-filterLeft-container'>
                {questions.map((question, index) => (
                  <QuestionBlock key={index} question={question} newTab />
                ))}
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
            </>
          )}
          {!loading && questions.length == 0 && (
            <div className='myProfile-right-content-filterLeft-nocontent'>
              <p>There are no questions</p>
            </div>
          )}
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
  const [posts, setPosts] = useState([]);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postTotalPage, setPostTotalPage] = useState(0);

  const [question, setQuestion] = useState([]);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [questionTotalPage, setQuestionTotalPage] = useState(0);

  const [showFilter, setShowFilter] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

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

  const onPostPageChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPostPage(pageNumber);
  };

  const onQuestionPageChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentQuestionPage(pageNumber);
  };

  const handlePageSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    setCurrentPostPage(1);
    if (currentPostPage == 1) {
      getDataPosts();
    }
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const onFilter = () => {
    if (menuIndex == 0) onFilterPosts();
    else onFilterQuestions();
  };

  const onFilterPosts = () => {
    setCurrentPostPage(1);
    if (currentPostPage == 1) {
      getDataPosts();
    }
  };

  const onFilterQuestions = () => {
    setCurrentQuestionPage(1);
    if (currentPostPage == 1) {
      getDataQuestions();
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate("#bookmarked");
  }, []);

  const getDataPosts = () => {
    if (!loading) {
      setLoading(true);
      GetAllPostBookmarkByToken(
        filter.title,
        filter.tags,
        filter.orderBy,
        filter.orderType,
        filter.dateFrom ? filter.dateFrom.toDate() : null,
        filter.dateTo ? filter.dateTo.toDate() : null,
        currentPostPage - 1,
        pageSize
      )
        .then((res) => {
          setPosts(res.data.data);
          setPostTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getDataQuestions = () => {
    if (!loading) {
      setLoading(true);
      GetAllQuestionBookmarkByToken(
        filter.title,
        filter.tags,
        filter.orderBy,
        filter.orderType,
        filter.dateFrom ? filter.dateFrom.toDate() : null,
        filter.dateTo ? filter.dateTo.toDate() : null,
        currentQuestionPage - 1,
        pageSize
      )
        .then((res) => {
          setQuestion(res.data.data);
          setQuestionTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (menuIndex == 0) getDataPosts();
    else if (menuIndex == 1) getDataQuestions();
  }, [pageSize, currentPostPage, currentQuestionPage, menuIndex]);

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>My Bookmarked</div>
      <div className='myProfile-right-menu'>
        <div
          className={`myProfile-right-menu-item ${menuIndex == 0 && "active"}`}
          onClick={() => {
            setMenuIndex(0);
          }}
        >
          Posts
        </div>
        <div
          className={`myProfile-right-menu-item ${menuIndex == 1 && "active"}`}
          onClick={() => {
            setMenuIndex(1);
          }}
        >
          Questions
        </div>
      </div>
      <div className='myProfile-right-content'>
        {menuIndex == 0 && (
          <div className='myProfile-right-content-filterLeft'>
            {loading && <Spin fullscreen />}
            {posts.length !== 0 && (
              <>
                <div className='myProfile-right-content-filterLeft-container'>
                  {posts.map((post, index) => (
                    <PostBlockList key={index} post={post} newTab />
                  ))}
                </div>
                <div className='myProfile-right-content-filterLeft-pagination'>
                  <Pagination
                    showQuickJumper
                    current={currentPostPage}
                    pageSize={pageSize}
                    total={postTotalPage}
                    onChange={onPostPageChange}
                    onShowSizeChange={handlePageSizeChange}
                    hideOnSinglePage
                  />
                </div>
              </>
            )}
            {!loading && posts.length == 0 && (
              <div className='myProfile-right-content-filterLeft-nocontent'>
                <p>There are no posts</p>
              </div>
            )}
          </div>
        )}
        {menuIndex == 1 && (
          <div className='myProfile-right-content-filterLeft'>
            {loading && <Spin fullscreen />}
            {posts.length !== 0 && (
              <>
                <div className='myProfile-right-content-filterLeft-container'>
                  {question.map((question, index) => (
                    <QuestionBlock key={index} question={question} newTab />
                  ))}
                </div>
                <div className='myProfile-right-content-filterLeft-pagination'>
                  <Pagination
                    showQuickJumper
                    current={currentQuestionPage}
                    pageSize={pageSize}
                    total={questionTotalPage}
                    onChange={onQuestionPageChange}
                    onShowSizeChange={handlePageSizeChange}
                    hideOnSinglePage
                  />
                </div>
              </>
            )}
            {!loading && posts.length == 0 && (
              <div className='myProfile-right-content-filterLeft-nocontent'>
                <p>There are no questions</p>
              </div>
            )}
          </div>
        )}
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
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  //filter state
  const [filter, setFilter] = useState<NotificationFilterProps>({
    notificationDateFrom: null,
    notificationDateTo: null,
    types: [],
    orderType: null,
    unRead: false,
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
      GetAllNotificationByToken(
        filter.unRead,
        filter.orderType,
        filter.notificationDateFrom
          ? filter.notificationDateFrom.toDate()
          : null,
        filter.notificationDateTo ? filter.notificationDateTo.toDate() : null,
        filter.types,
        currentPage - 1,
        pageSize
      )
        .then((res) => {
          setNotifications(res.data.data);
          setTotalPage(res.data.totalCount);
        })
        .catch((error: AxiosError) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate("#notification");
  }, []);

  const handleMarkRead = (id: string) => {
    MarkRead(id)
      .then(() => {
        setNotifications(
          notifications.map((x) => {
            if (x.id != id) return x;
            return {
              ...x,
              isRead: true,
            };
          })
        );
      })
      .catch(() => {});
  };

  const handleMarkUnread = (id: string) => {
    MarkUnread(id)
      .then(() => {
        setNotifications(
          notifications.map((x) => {
            if (x.id != id) return x;
            return {
              ...x,
              isRead: false,
            };
          })
        );
      })
      .catch(() => {});
  };

  const handleDelete = (id: string) => {
    Delete(id)
      .then(() => {
        setNotifications(notifications.filter((x) => x.id != id));
      })
      .catch(() => {});
  };

  return (
    <div className='myProfile-right-container'>
      <div className='myProfile-right-header'>Notifications</div>
      <div className='myProfile-right-content'>
        <div className='myProfile-right-content-filterLeft'>
          <h2 className='myProfile-right-content-title'>Notifications</h2>
          {loading && <Spin fullscreen />}
          {notifications.length !== 0 && (
            <>
              <div className='myProfile-right-content-filterLeft-container'>
                {notifications.map((notification, index) => (
                  <NotificationBlock
                    key={index}
                    notification={notification}
                    handleDelete={handleDelete}
                    handleMarkUnread={handleMarkUnread}
                    handleMarkRead={handleMarkRead}
                  />
                ))}
              </div>
              <div className='myProfile-right-content-filterLeft-pagination'>
                <Pagination
                  showQuickJumper
                  current={currentPage}
                  total={totalPage}
                  onChange={onChange}
                  hideOnSinglePage
                />
              </div>
            </>
          )}
          {!loading && notifications.length == 0 && (
            <div className='myProfile-right-content-filterLeft-nocontent'>
              <p>There are no notifications</p>
            </div>
          )}
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
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: null,
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: null,
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
    tags: ["c", "malloc", "dynamic-memory-allocation", "fgets"],
  },
  {
    id: "123",
    title:
      "Use of malloc function instead of fgets for a file and an array[100000]",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png",
    createdDate: new Date(2023, 11, 22, 15, 43, 22),
    updatedDate: new Date(2023, 11, 22, 15, 43, 22),
    userName: "Gus",
    followCount: 23,
    viewCount: 123,
    answerCount: 12,
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

// const notificationData: NotificationModel[] = [
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "upVoted your post",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: false,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "followed you",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: false,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "has responded to your comment",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: true,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "commented on your post",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: false,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "has responded to your comment",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: true,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "commented on your post",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: false,
//   },
//   {
//     user: "@Halley",
//     userId: "#",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
//     content: "commented on your post",
//     date: new Date(2023, 12, 12, 12, 45, 12),
//     link: "#",
//     isRead: false,
//   },
// ];
