import React from 'react';
import languageProcesser from './languageProcesser';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import rawData from '../../languages.json';

const items = languageProcesser(rawData);

function LanguageDropDown({ language, setLanguage }) {
  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => {
          setLanguage(rawData[e.key - 1]);
        },
      }}
      on>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {language}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default LanguageDropDown;
