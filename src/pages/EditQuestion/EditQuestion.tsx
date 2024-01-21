import { Input, notification } from "antd";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../Logo";
import BasicEditor, {
  EditorRef,
} from "../../components/BasicEditor/BasicEditor";
import AddTag from "../../components/Tags/AddTag";
import "./editQuestion.scss";

const EditQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<EditorRef>(null);
  const [tags, setTags] = useState<string[]>([]);
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

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div className='create-question'>
      {contextHolder}
      <div className='create-question-logo'>
        <Logo />
      </div>
      <h5 className='create-question-title'>Edit question</h5>
      <div className='create-question-container'>
        <label className='create-question-label'>Title</label>
        <Input placeholder='Title' value={title} onChange={onTitleChange} />
        <label className='create-question-label'>Tag</label>{" "}
        <span className='create-question-describe'>(at least 1 tag)</span>
        <div className='create-question-function'>
          <div className='create-question-function-tag'>
            <AddTag tags={tags} setTags={setTags} />
          </div>
          <div className='create-question-function-publish'>Publish</div>
        </div>
        <div className='create-question-text'>
          <BasicEditor ref={editorRef} value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
