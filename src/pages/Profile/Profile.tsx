import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { DatePicker, Input, Pagination, PaginationProps, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import {
  FaBell,
  FaCamera,
  FaFilter,
  FaHistory,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import MenuLeft, { MenuItem } from "../../components/MenuLeft/MenuLeft";
import Gender from "../../enums/Gender";
import { ProfileMenu } from "../../enums/ProfileMenu";
import { FaSave } from "react-icons/fa";
import "./profile.scss";
import {
  deleteImage,
  resizeAndUploadImage,
} from "../../services/FireBaseService";
import { ImageUploaded } from "../../components/BasicEditor/BasicEditor";
import DefaultAvatar from "../../images/default_avatar.png";
import { QuestionListModel } from "../../model/questionModel";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import {
  PostFilter as FilterProps,
  PostBlock,
  PostList,
} from "../../model/postModel";
import { FaBookmark } from "react-icons/fa";
import PostFilter from "../../components/Filter/PostFilter/PostFilter";
import NotificationFilter from "../../components/Filter/NotificationFilter/NotificationFilter";
import { Logo } from "../../Logo";
import { Link } from "react-router-dom";
import PostBlockSmall from "../../components/PostBlock/PostBlockSmall/PostBlockSmall";
import PostBlockList from "../../components/PostBlock/PostBlockList/PostBlockList";
import {
  NotificationFilter as NotificationFilterProps,
  NotificationModel,
} from "../../model/notificationModel";
import NotificationBlock from "../../components/NotificationBlock/NotificationBlock";

function Profile() {
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

  const [selectedMenu, setSelectedMenu] = useState(ProfileMenu.Profile);

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

  return (
    <div className='profile'>
      <div className='profile-left'>
        <MenuLeft
          items={menuItems}
          avartar='https://i.pinimg.com/736x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg'
          fullName='Nguyen Thien Sua'
          userName='NTSua1908'
        />
      </div>
      <div className='profile-right'>
        {renderMenu()}
        <Link to={"/"} className='profile-right-logo'>
          <Logo />
        </Link>
      </div>
    </div>
  );
}

export default Profile;

const PersonalInfo = () => {
  const [avatar, setAvatar] = useState<ImageUploaded[]>([]);
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [dateJoined, setDateJoined] = useState<Dayjs | null>(
    dayjs("2023-11-30")
  );
  const [dob, setDoB] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState(Gender.Unknown);
  const [bio, setBio] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.currentTarget.value);
  };

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleChange = (value: string) => {
    setGender(Gender[value as keyof typeof Gender]);
  };

  const onBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.currentTarget.value);
  };

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
      await resizeAndUploadImage(files[0], null, avatar, setAvatar, 300);
      setIsUploading(false);
    }
  };

  return (
    <div className='profile-right-container'>
      <div className='profile-right-header'>Personal Information</div>
      <div className='profile-right-content'>
        <div className='profile-right-content-left'>
          <div className='profile-right-content-left-avatar'>
            <img src={avatar[0]?.link ?? DefaultAvatar} alt='' />
            <label
              className='profile-right-content-left-avatar-icon'
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
          <div className='profile-right-content-left-button'>
            <span style={{ marginRight: "5px" }}>Save</span> <FaSave />
          </div>
          {isUploading && (
            <div style={{ textAlign: "center" }}>Uploading...</div>
          )}
        </div>
        <div className='profile-right-content-right'>
          <div className='profile-right-content-container'>
            <div className='profile-right-content-container-right'>
              <label className='profile-right-content-label' htmlFor='fullname'>
                Full name
              </label>
              <Input
                name='fullname'
                className='profile-right-content-input'
                prefix={<UserOutlined />}
                placeholder='Full name'
                value={fullName}
                onChange={onFullNameChange}
              />
              <label className='profile-right-content-label' htmlFor='username'>
                Username
              </label>
              <Input
                name='username'
                className='profile-right-content-input'
                prefix={<UserOutlined />}
                placeholder='Username'
                value={username}
                onChange={onUserNameChange}
              />
            </div>
          </div>
          <div className='profile-right-content-container evenly'>
            <div className='profile-right-content-container-left'>
              <label className='profile-right-content-label' htmlFor='email'>
                Email
              </label>
              <Input
                name='email'
                className='profile-right-content-input'
                prefix={<MailOutlined />}
                placeholder='Email'
                disabled
                value={email}
              />
            </div>
            <div className='profile-right-content-container-right'>
              <label
                className='profile-right-content-label'
                htmlFor='datejoined'
              >
                Date joined
              </label>
              <DatePicker
                name='datejoined'
                className='profile-right-content-input'
                placeholder='Date joined'
                value={dateJoined}
                disabled
              />
            </div>
          </div>
          <div className='profile-right-content-container evenly'>
            <div className='profile-right-content-container-left'>
              <label className='profile-right-content-label' htmlFor='dob'>
                Date of birth
              </label>
              <DatePicker
                name='dob'
                className='profile-right-content-input'
                placeholder='Date of birth'
                value={dob}
                onChange={setDoB}
              />
            </div>

            <div className='profile-right-content-container-right'>
              <label className='profile-right-content-label'>Gender</label>
              <Select
                className='profile-right-content-input'
                defaultValue={Gender[gender]}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: Gender[0], label: Gender[0] },
                  { value: Gender[1], label: Gender[1] },
                  { value: Gender[2], label: Gender[2] },
                ]}
              />
            </div>
          </div>
          <div className='profile-right-content-container-bio'>
            <label className='profile-right-content-label' htmlFor='bio'>
              Bio
            </label>
            <TextArea
              name='bio'
              placeholder='Bio'
              value={bio}
              onChange={onBioChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalPost = () => {
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
    <div className='profile-right-container'>
      <div className='profile-right-header'>My Posts</div>
      <div className='profile-right-content'>
        <div className='profile-right-content-filterLeft'>
          <h2 className='profile-right-content-title'>Questions</h2>
          <div className='profile-right-content-filterLeft-container'>
            {posts.map((post, index) => (
              <PostBlockList key={index} post={post} />
            ))}
          </div>
          <div className='profile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='profile-right-content-filterRight'>
          <div
            className={`profile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='profile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='profile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='profile-right-content-filterRight-toggle'
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
    <div className='profile-right-container'>
      <div className='profile-right-header'>My Questions</div>
      <div className='profile-right-content'>
        <div className='profile-right-content-filterLeft'>
          <h2 className='profile-right-content-title'>Questions</h2>
          <div className='profile-right-content-filterLeft-container'>
            {questions.map((question, index) => (
              <QuestionBlock key={index} question={question} />
            ))}
          </div>
          <div className='profile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='profile-right-content-filterRight'>
          <div
            className={`profile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='profile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='profile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='profile-right-content-filterRight-toggle'
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
    <div className='profile-right-container'>
      <div className='profile-right-header'>My Bookmarked</div>
      <div className='profile-right-content'>
        <div className='profile-right-content-filterLeft'>
          <h2 className='profile-right-content-title'>Bookmarked</h2>
          <div className='profile-right-content-filterLeft-container'>
            {posts.map((post, index) => (
              <PostBlockList key={index} post={post} />
            ))}
          </div>
          <div className='profile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='profile-right-content-filterRight'>
          <div
            className={`profile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='profile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='profile-right-content-filterRight-container-filter'>
              <PostFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='profile-right-content-filterRight-toggle'
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
    <div className='profile-right-container'>
      <div className='profile-right-header'>Notifications</div>
      <div className='profile-right-content'>
        <div className='profile-right-content-filterLeft'>
          <h2 className='profile-right-content-title'>Notifications</h2>
          <div className='profile-right-content-filterLeft-container'>
            {notifications.map((notification, index) => (
              <NotificationBlock key={index} notification={notification} />
            ))}
          </div>
          <div className='profile-right-content-filterLeft-pagination'>
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalPage}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='profile-right-content-filterRight'>
          <div
            className={`profile-right-content-filterRight-container ${
              showFilter && "show"
            }`}
          >
            <div
              className='profile-right-content-filterRight-container-background'
              onClick={handleCloseFilter}
            ></div>
            <div className='profile-right-content-filterRight-container-filter'>
              <NotificationFilter
                filter={filter}
                setFilter={setFilter}
                onFilter={onFilter}
                onClose={handleCloseFilter}
              />
            </div>
          </div>
          <div
            className='profile-right-content-filterRight-toggle'
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    upvote: 10,
    downvote: 1,
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
    content: "upvoted your post",
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
