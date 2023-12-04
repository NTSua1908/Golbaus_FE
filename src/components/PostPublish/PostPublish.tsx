import {
  Button,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd';
import React, { useState, useEffect } from 'react';
import PublishType from '../../enums/PublishType';
import dayjs, { Dayjs } from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import './postPublish.scss';

interface PostPublishProps {
  publishType: PublishType;
  setPublishType: React.Dispatch<React.SetStateAction<PublishType>>;
  onPublish: () => void;
  publishDay: Dayjs | null;
  setPublishDay: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf('day');
};

const { Text } = Typography;

const PostPublish: React.FC<PostPublishProps> = ({
  publishType,
  setPublishType,
  onPublish,
  publishDay,
  setPublishDay,
}) => {
  const [error, setError] = useState<boolean>(false);

  const onChange = (e: RadioChangeEvent) => {
    setPublishType(e.target.value);
  };

  useEffect(() => {
    console.log(publishDay, dayjs().isAfter(publishDay));
    setError(dayjs().add(30, 'minutes').isAfter(publishDay));
  }, [publishDay]);

  return (
    <div className='post-publish'>
      <div className='post-publish-container'>
        <div className='post-publish-heading'>
          <Radio.Group
            onChange={onChange}
            value={publishType}>
            {/* <Space direction='vertical'> */}
            <Radio value={PublishType.Public}>Public</Radio>
            <Radio value={PublishType.Schedule}>Schedule</Radio>
            <Radio value={PublishType.Private}>Private</Radio>
            {/* </Space> */}
          </Radio.Group>
          <div
            className={`post-publish-heading-time ${
              publishType == PublishType.Schedule ? 'show' : 'hidden'
            }`}>
            <DatePicker
              format='YYYY-MM-DD HH:mm:ss'
              disabledDate={disabledDate}
              showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
              onChange={setPublishDay}
            />
            {error && (
              <div>
                <Text type='danger'>
                  The publication time must be 30 minutes after the current time
                </Text>
              </div>
            )}
          </div>
        </div>
        <div className='post-publish-footer'>
          <Button
            className='post-publish-footer-publish'
            onClick={onPublish}
            disabled={
              !error &&
              publishType == PublishType.Schedule &&
              publishDay == null
            }>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPublish;
