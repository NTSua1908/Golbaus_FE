import { Input, Spin, notification } from "antd";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../../Logo";
import BasicEditor, {
  EditorRef,
} from "../../components/BasicEditor/BasicEditor";
import AddTag from "../../components/Tags/AddTag";
import "./editQuestion.scss";
import { QuestionCreateUpdateModel } from "../../model/questionModel";
import { GetDetail, Update } from "../../services/QuestionService";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { setQuestionContent } from "../../actions/commentAction";
import NotFound from "../../images/not_found.png";

const EditQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<string>("");
  const editorRef = useRef<EditorRef>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isNotFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Updated successfully",
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

  const dispatch = useDispatch();
  let { questionId } = useParams();

  const onPublish = () => {
    if (!loading) {
      const question: QuestionCreateUpdateModel = {
        title: title,
        content: value,
        tags: tags,
      };
      setLoading(true);
      Update(questionId as string, question)
        .then((res) => {
          openNotificationSuccess();
          setTimeout(() => {
            navigate("/question/" + questionId, { state: { isReload: true } });
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

  useEffect(() => {
    if (!loading && questionId) {
      GetDetail(questionId)
        .then((res) => {
          setTitle(res.data.title);
          setValue(res.data.content);
          setTags(res.data.tags);
          dispatch(setQuestionContent(res.data));
        })
        .catch((error: AxiosError) => {
          if (error.request.status === 400) {
            setNotFound(true);
          }
        });
    }
  }, []);

  return (
    <div className='create-question'>
      {contextHolder}
      {isNotFound && (
        <div className='postDetail-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {loading && (
        <div>
          <Spin fullscreen size='large' />
        </div>
      )}
      {value.length > 0 && (
        <>
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
              <div
                className='create-question-function-publish'
                onClick={onPublish}
              >
                Publish
              </div>
            </div>
            <div className='create-question-text'>
              <BasicEditor ref={editorRef} value={value} setValue={setValue} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditQuestion;
