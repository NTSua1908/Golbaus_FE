import React, {
  ChangeEvent,
  ChangeEventHandler,
  useRef,
  useState,
} from 'react';
import BasicEditor, {
  EditorProps,
  EditorRef,
} from '../../components/BasicEditor/BasicEditor';
import { Button, Input, Popover, notification } from 'antd';
import PostPublish from '../../components/PostPublish/PostPublish';
import PublishType from '../../enums/PublishType';
import { Dayjs } from 'dayjs';
import AddTag from '../../components/Tags/AddTag';
import './createPost.scss';
import { title } from '@uiw/react-md-editor';
import Header from '../../components/Header/Header';
import ShowCode from '../../components/ShowCode/ContentDisplayer';

const CreatePost: React.FC = () => {
  const [publishType, setPublishType] = useState<PublishType>(
    PublishType.Public
  );
  const [title, setTitle] = useState('');
  const [publishDay, setPublishDay] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<string>('');
  const editorRef = useRef<EditorRef>(null);
  const [api, contextHolder] = notification.useNotification();
  const [tags, setTags] = useState<string[]>([]);

  const onPublish = async () => {
    if (editorRef.current) {
      await editorRef.current
        .onSavePost()
        .then(() => {
          api.open({
            message: 'Success',
            description:
              'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 0,
          });
        })
        .catch(() => {
          api.open({
            message: 'Error',
            description:
              'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 0,
          });
        });
    }
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div className='create-post'>
      {/* Headder */}
      <Header />
      {/* Body */}
      <div className='create-post-container'>
        <Input
          placeholder='Title'
          value={title}
          onChange={onTitleChange}
        />
        <div className='create-post-function'>
          <div className='create-post-function-tag'>
            <AddTag
              tags={tags}
              setTags={setTags}
            />
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
              trigger='click'>
              <Button
                disabled={tags.length == 0 || title.length == 0}
                title={
                  tags.length == 0 || title.length == 0
                    ? 'Add a title and at least one tag'
                    : 'Post your article'
                }>
                Post your article
              </Button>
            </Popover>
          </div>
        </div>
        <BasicEditor
          ref={editorRef}
          value={value}
          setValue={setValue}
        />
        {/* <ShowCode content={value} /> */}
      </div>
    </div>
  );
};

export default CreatePost;
