import React, { useRef, useState } from 'react';
import BasicEditor, {
  EditorProps,
  EditorRef,
} from '../../components/BasicEditor/BasicEditor';
import { Button, Input, Popover, notification } from 'antd';
import PostPublish from '../../components/PostPublish/PostPublish';
import PublishType from '../../enums/PublishType';

const CreatePost: React.FC = () => {
  const [publishType, setPublishType] = useState<PublishType>(
    PublishType.Public
  );
  const [value, setValue] = useState<string>('');
  const editorRef = useRef<EditorRef>(null);
  const [api, contextHolder] = notification.useNotification();

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

  return (
    <div>
      <Input placeholder='Title' />
      <Popover
        content={
          <PostPublish
            onPublish={onPublish}
            publishType={publishType}
            setPublishType={setPublishType}
          />
        }
        title='Title'
        trigger='click'>
        <Button>Click me</Button>
      </Popover>
      <BasicEditor
        ref={editorRef}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default CreatePost;
