import { Button, Radio, RadioChangeEvent, Space } from 'antd';
import React, { useState } from 'react';
import PublishType from '../../enums/PublishType';

interface PostPublishProps {
  publishType: PublishType;
  setPublishType: React.Dispatch<React.SetStateAction<PublishType>>;
  onPublish: () => void;
}

const PostPublish: React.FC<PostPublishProps> = ({
  publishType,
  setPublishType,
  onPublish,
}) => {
  const onChange = (e: RadioChangeEvent) => {
    setPublishType(e.target.value);
  };

  return (
    <div className='post-publish'>
      <div className='post-publish-container'>
        <h2 className='post-publish-title'>Publish your post</h2>
        <span className='post-publish-heading'>
          <Radio.Group
            onChange={onChange}
            value={publishType}>
            <Space direction='vertical'>
              <Radio value={PublishType.Public}>Public</Radio>
              <Radio value={PublishType.Schedule}>Schedule</Radio>
              <Radio value={PublishType.Private}>Private</Radio>
            </Space>
          </Radio.Group>
        </span>
        <Button onClick={onPublish}>Publish</Button>
      </div>
    </div>
  );
};

export default PostPublish;
