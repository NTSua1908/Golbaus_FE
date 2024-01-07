import { AutoComplete, Space, Tag, Tooltip, theme } from "antd";
import type { BaseSelectRef } from "rc-select";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import "./addTag.scss";

interface AddTagProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

//timeout search text (call api get tags) after 0.5s
let timeoutId: NodeJS.Timeout;

const AddTag: React.FC<AddTagProps> = ({ tags, setTags }) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<BaseSelectRef>(null);
  const editInputRef = useRef<BaseSelectRef>(null);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const getPanelValue = (searchText: string) => {
    console.log(searchText);
    return !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const handleEditEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleEditInputConfirm();
    }
  };

  const handleInputEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputConfirm();
    }
  };

  const tagInputStyle: React.CSSProperties = {
    width: 150,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const onEditChange = (data: string) => {
    setEditInputValue(data);
  };

  const onInputChange = (data: string) => {
    setInputValue(data);
  };

  const handleSearch = (text: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setAnotherOptions(getPanelValue(text));
    }, 500);
  };

  return (
    <Space size={[0, 8]} wrap className="addTag">
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <AutoComplete
              key={tag}
              size="small"
              value={editInputValue}
              style={tagInputStyle}
              onChange={onEditChange}
              onBlur={handleEditInputConfirm}
              onKeyDown={handleEditEnter}
              options={anotherOptions}
              onSearch={handleSearch}
              placeholder="Edit tag"
              ref={editInputRef}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                setEditInputIndex(index);
                setEditInputValue(tag);
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <AutoComplete
          ref={inputRef}
          size="small"
          value={inputValue}
          style={tagInputStyle}
          onChange={onInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={handleInputEnter}
          options={anotherOptions}
          onSearch={handleSearch}
          placeholder="New tag"
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<GoPlus />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </Space>
  );
};

export default AddTag;
