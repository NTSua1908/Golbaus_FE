import { Button, Input, Popover, message, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AxiosError } from "axios";
import { Dayjs } from "dayjs";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdCloudUpload } from "react-icons/io";
import BasicEditor, {
  EditorRef,
  ImageUploaded,
} from "../../components/BasicEditor/BasicEditor";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PostPublish from "../../components/PostPublish/PostPublish";
import AddTag from "../../components/Tags/AddTag";
import PublishType from "../../enums/PublishType";
import {
  deleteImage,
  resizeAndUploadImage,
} from "../../services/FireBaseService";
import { Create as CreateNewPost } from "../../services/PostService";
import "./createPost.scss";
import { Logo } from "../../Logo";
import { useNavigate } from "react-router-dom";
import { PostCreateModel } from "../../model/postModel";
import Module from "../../enums/Module";

const CreatePost: React.FC = () => {
  const [publishType, setPublishType] = useState<PublishType>(
    PublishType.Public
  );
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [publishDay, setPublishDay] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<EditorRef>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<ImageUploaded[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Created successfully",
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

  const onPublish = async () => {
    if (editorRef.current) {
      console.log(
        publishType == PublishType.Schedule &&
          publishDay != null &&
          publishDay.toDate()
      );
      await editorRef.current
        .onSavePost()
        .then(async (res) => {
          const post: PostCreateModel = {
            title: title,
            content: value,
            excerpt: excerpt,
            publishType: publishType,
            tags: tags,
            thumbnail: thumbnail[0].link,
            willBePublishedOn:
              publishType == PublishType.Schedule && publishDay != null
                ? publishDay.toDate()
                : null,
          };
          await CreateNewPost(post)
            .then((res) => {
              openNotificationSuccess();
              setTimeout(() => {
                navigate("/post/" + res.data);
              }, 2000);
            })
            .catch((error: AxiosError) => {
              const errors = (error.response?.data as any).errors;
              const errorMessage = errors.join("\n") as string;
              openNotificationFailure(errorMessage);
            });
        })
        .catch();

      console.log("Created");
    }
  };

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      if (isDataChanged()) {
        const shouldClose = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (shouldClose) {
          deleteImage(thumbnail, (x) => {
            return true;
          });
        }
      }
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onExcerptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExcerpt(e.currentTarget.value);
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      //delete previous image
      setIsUploading(true);
      if (thumbnail.length > 0) {
        await deleteImage(thumbnail, (x) => {
          return true;
        });
        setThumbnail([]);
      }
      await resizeAndUploadImage(
        files[0],
        null,
        thumbnail,
        setThumbnail,
        Module.Post,
        1024
      );
      setIsUploading(false);
    }
  };

  const isDataChanged = () => {
    return (
      value.length != 0 ||
      title.length != 0 ||
      excerpt.length != 0 ||
      thumbnail.length != 0 ||
      tags.length != 0
    );
  };

  return (
    <div className='create-post'>
      {contextHolder}
      <div className='create-post-logo'>
        <Logo />
      </div>
      <h5 className='edit-post-title'>Create post</h5>
      <div className='create-post-container'>
        <label className='create-post-label'>Title</label>
        <Input placeholder='Title' value={title} onChange={onTitleChange} />
        <div className='create-post-excerpt'>
          <label className='create-post-label'>Excerpt</label>{" "}
          <span className='create-post-describe'>(at least 50 characters)</span>
          <TextArea
            placeholder='Describe your post (at least 50 characters)'
            minLength={50}
            value={excerpt}
            onChange={onExcerptChange}
          />
        </div>
        <div className='create-post-thumbnail'>
          <input
            type='file'
            id='create-post-thumbnail-input'
            className='create-post-thumbnail-input'
            accept='image/*'
            onChange={onThumbnailChange}
          />
          <label
            htmlFor='create-post-thumbnail-input' // Corrected attribute name
            className='create-post-thumbnail-label'
          >
            <IoMdCloudUpload /> Thumbnail
          </label>
          <div className='create-post-thumbnail-image'>
            {isUploading && "Loading....."}
            {!isUploading && thumbnail.length > 0 && (
              <img src={thumbnail[0].link} />
            )}
          </div>
        </div>
        <label className='create-post-label'>Tag</label>{" "}
        <span className='create-post-describe'>(at least 1 tag)</span>
        <div className='create-post-function'>
          <div className='create-post-function-tag'>
            <AddTag tags={tags} setTags={setTags} />
          </div>
          <div className='create-post-function-publish'>
            <Popover
              content={
                <PostPublish
                  onPublish={onPublish}
                  publishType={publishType}
                  setPublishType={setPublishType}
                  publishDay={publishDay}
                  setPublishDay={setPublishDay}
                />
              }
              title='Post your article'
              placement='bottomRight'
              trigger='click'
            >
              <Button
                disabled={
                  tags.length == 0 ||
                  title.length == 0 ||
                  excerpt.length < 50 ||
                  thumbnail.length == 0 ||
                  value.length == 0
                }
                title={
                  tags.length == 0 ||
                  title.length == 0 ||
                  excerpt.length < 50 ||
                  thumbnail.length == 0 ||
                  value.length == 0
                    ? "Add a title and at least one tag, 50 characters in excerpt, thumbnail"
                    : "Post your article"
                }
              >
                Post your article
              </Button>
            </Popover>
          </div>
        </div>
        <div className='create-post-text'>
          <BasicEditor
            ref={editorRef}
            value={value}
            setValue={setValue}
            uploadImage
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default CreatePost;
