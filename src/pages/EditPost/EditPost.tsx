import { Button, Input, Popover, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
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
import "./editPost.scss";
import { Logo } from "../../Logo";

const EditPost: React.FC = () => {
  const [publishType, setPublishType] = useState<PublishType>(
    PublishType.Public
  );
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [publishDay, setPublishDay] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<EditorRef>(null);
  const [api, contextHolder] = notification.useNotification();
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<ImageUploaded[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const onPublish = async () => {
    if (editorRef.current) {
      await editorRef.current
        .onSavePost()
        .then(() => {
          api.open({
            message: "Success",
            description:
              "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
            duration: 0,
          });
        })
        .catch(() => {
          api.open({
            message: "Error",
            description:
              "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
            duration: 0,
          });
        });
    }
  };

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (
        value.length != 0 ||
        title.length != 0 ||
        excerpt.length != 0 ||
        thumbnail.length != 0 ||
        tags.length != 0
      ) {
        event.preventDefault();
        event.returnValue = "";
        //   console.log(
        //     value.length,
        //     title.length,
        //     excerpt.length,
        //     thumbnail.length,
        //     tags.length
        //   );
        // const shouldClose = window.confirm(
        //   "You have unsaved changes. Are you sure you want to leave?"
        // );
        // if (shouldClose) {
        //   deleteImage(thumbnail, (x) => {
        //     return true;
        // });
      }
    };
    // };

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
      await resizeAndUploadImage(files[0], null, thumbnail, setThumbnail, 1024);
      setIsUploading(false);
    }
  };

  const isDataChanged = () => {
    console.log(title, title.length);
    return (
      value.length != 0 ||
      title.length != 0 ||
      excerpt.length != 0 ||
      thumbnail.length != 0 ||
      tags.length != 0
    );
  };

  return (
    <div className="edit-post">
      <div className="edit-post-logo">
        <Logo />
      </div>
      <h5 className="edit-post-title">Edit post</h5>
      <div className="edit-post-container">
        <label className="edit-post-label">Title</label>
        <Input placeholder="Title" value={title} onChange={onTitleChange} />
        <div className="edit-post-excerpt">
          <label className="edit-post-label">Excerpt</label>{" "}
          <span className="edit-post-describe">(at least 50 characters)</span>
          <TextArea
            placeholder="Describe your post (at least 50 characters)"
            minLength={50}
            value={excerpt}
            onChange={onExcerptChange}
          />
        </div>
        <div className="edit-post-thumbnail">
          <input
            type="file"
            id="edit-post-thumbnail-input"
            className="edit-post-thumbnail-input"
            accept="image/*"
            onChange={onThumbnailChange}
          />
          <label
            htmlFor="edit-post-thumbnail-input" // Corrected attribute name
            className="edit-post-thumbnail-label"
          >
            <IoMdCloudUpload /> Thumbnail
          </label>
          <div className="edit-post-thumbnail-image">
            {isUploading && "Loading....."}
            {!isUploading && thumbnail.length > 0 && (
              <img src={thumbnail[0].link} />
            )}
          </div>
        </div>
        <label className="edit-post-label">Tag</label>{" "}
        <span className="edit-post-describe">(at least 1 tag)</span>
        <div className="edit-post-function">
          <div className="edit-post-function-tag">
            <AddTag tags={tags} setTags={setTags} />
          </div>
          <div className="edit-post-function-publish">
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
              title="Post your article"
              placement="bottomRight"
              trigger="click"
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
        <BasicEditor ref={editorRef} value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default EditPost;
