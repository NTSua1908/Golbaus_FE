import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import OrderBy from "../../../enums/OrderBy";
import OrderType from "../../../enums/OrderType";
import { Input, Select } from "antd";
import { PostFilter as FilterProps } from "../../../model/postModel";
import AddTag from "../../Tags/AddTag";
import { DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import "./postFilter.scss";

const { RangePicker } = DatePicker;

interface PostFilterProps {
  filter: FilterProps;
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
  onFilter: () => void;
  onClose: () => void;
}

function PostFilter({ filter, setFilter, onFilter, onClose }: PostFilterProps) {
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevState) => {
      return { ...prevState, title: e.currentTarget.value };
    });
  };

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setFilter((prevState) => {
      return { ...prevState, tags };
    });
  }, [tags]);

  const handleDateChange = (
    values: RangeValue<Dayjs>,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = values as [Dayjs, Dayjs];
    setFilter((prevState) => {
      return { ...prevState, dateFrom: startDate, dateTo: endDate };
    });
  };

  const handleOrderByChange = (value: string) => {
    const orderBy =
      value === "None" ? null : OrderBy[value as keyof typeof OrderBy];
    setFilter((prevState) => {
      return { ...prevState, orderBy };
    });
  };

  const handleOrderTypeChange = (value: string) => {
    const orderType =
      value === "None" ? null : OrderType[value as keyof typeof OrderType];
    setFilter((prevState) => {
      return { ...prevState, orderType };
    });
  };

  const onApplyFilter = () => {
    onClose();
    onFilter();
  };

  return (
    <div className="filterPost">
      <h2 className="filterPost-title">Filter</h2>
      <div className="filterPost-container">
        <div className="filterPost-item">
          <label className="filterPost-label" htmlFor="fullname">
            Title
          </label>
          <Input
            className="filterPost-input"
            placeholder="Title"
            value={filter.title}
            onChange={onTitleChange}
          />
        </div>
        <div className="filterPost-item">
          <label className="filterPost-label" htmlFor="fullname">
            Tags
          </label>
          <div className="filterPost-tags">
            <AddTag tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className="filterPost-item">
          <label className="filterPost-label" htmlFor="fullname">
            Published date
          </label>
          <RangePicker
            allowEmpty={[true, true]}
            value={[filter.dateFrom, filter.dateTo]}
            onChange={handleDateChange}
          />
        </div>
        <div className="filterPost-item">
          <label className="filterPost-label">Order by</label>
          <Select
            className="filterPost-input"
            defaultValue={
              filter.orderBy === null ? "None" : OrderBy[filter.orderBy]
            }
            style={{ width: 120 }}
            onChange={handleOrderByChange}
            options={[
              { value: null, label: "None" },
              { value: OrderBy[0], label: OrderBy[0] },
              { value: OrderBy[1], label: OrderBy[1] },
              { value: OrderBy[2], label: OrderBy[2] },
              { value: OrderBy[3], label: OrderBy[3] },
            ]}
          />
        </div>
        <div className="filterPost-item">
          <label className="filterPost-label">Order type</label>
          <Select
            className="filterPost-input"
            defaultValue={
              filter.orderType === null ? "None" : OrderType[filter.orderType]
            }
            style={{ width: 120 }}
            onChange={handleOrderTypeChange}
            options={[
              { value: null, label: "Default" },
              { value: OrderType[0], label: OrderType[0] },
              { value: OrderType[1], label: OrderType[1] },
            ]}
          />
        </div>
        <div className="filterPost-item function">
          <div className="filterPost-button cancel" onClick={onClose}>
            Cancel
          </div>
          <div className="filterPost-button apply" onClick={onApplyFilter}>
            Apply
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFilter;
