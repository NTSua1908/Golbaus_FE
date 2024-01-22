import { Input, Spin, notification } from "antd";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../Logo";
import BasicEditor, {
  EditorRef,
} from "../../components/BasicEditor/BasicEditor";
import AddTag from "../../components/Tags/AddTag";
import "./createQuestion.scss";
import { QuestionCreateUpdateModel } from "../../model/questionModel";
import { Create } from "../../services/QuestionService";
import { AxiosError } from "axios";

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<EditorRef>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

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

  const onPublish = () => {
    if (!loading) {
      const question: QuestionCreateUpdateModel = {
        title: title,
        content: value,
        tags: tags,
      };
      setLoading(true);
      Create(question)
        .then((res) => {
          openNotificationSuccess();
          setTimeout(() => {
            navigate("/question/" + res.data);
          }, 2000);
        })
        .catch((error: AxiosError) => {
          const errors = (error.response?.data as any).errors;
          if (errors) {
            const errorMessage = errors.join("\n") as string;
            openNotificationFailure(errorMessage);
          } else {
            openNotificationFailure("Something went wrong");
          }
        })
        .finally(() => {
          setLoading(false);
        });

      console.log("Created");
    }
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
      {loading && <Spin fullscreen />}
      <div className='create-question-logo'>
        <Logo />
      </div>
      <h5 className='create-question-title'>Create question</h5>
      <div className='create-question-container'>
        <label className='create-question-label'>Title</label>
        <Input placeholder='Title' value={title} onChange={onTitleChange} />
        <label className='create-question-label'>Tag</label>{" "}
        <span className='create-question-describe'>(at least 1 tag)</span>
        <div className='create-question-function'>
          <div className='create-question-function-tag'>
            <AddTag tags={tags} setTags={setTags} />
          </div>
          <button
            className='create-question-function-publish'
            onClick={onPublish}
            disabled={
              title.length < 10 ||
              value.length < 20 ||
              loading ||
              tags.length === 0
            }
          >
            Publish
          </button>
        </div>
        <div className='create-question-text'>
          <BasicEditor ref={editorRef} value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
