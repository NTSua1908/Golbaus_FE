import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import OrderBy from "../../../enums/OrderBy";
import OrderType from "../../../enums/OrderType";
import { Input, Select } from "antd";
import { NotificationFilter as FilterProps } from "../../../model/notificationModel";
import AddTag from "../../Tags/AddTag";
import { DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import "./notificationFilter.scss";
import NotificationType from "../../../enums/NotificationType";

const { RangePicker } = DatePicker;

interface NotificationFilterProps {
  filter: FilterProps;
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
  onFilter: () => void;
  onClose: () => void;
}

function NotificationFilter({
  filter,
  setFilter,
  onFilter,
  onClose,
}: NotificationFilterProps) {
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

  const handleFilterType = (value: string | string[]) => {
    const notificationType =
      value.length === 0
        ? null
        : (value as string[]).map(
            (x) => NotificationType[x as keyof typeof NotificationType]
          );
    setFilter((prevState) => {
      return { ...prevState, notificationType };
    });
    console.log(notificationType);
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
    <div className='filterNotification'>
      <h2 className='filterNotification-title'>Filter</h2>
      <div className='filterNotification-container'>
        <div className='filterNotification-item'>
          <label className='filterNotification-label' htmlFor='fullname'>
            Notification date
          </label>
          <RangePicker
            allowEmpty={[true, true]}
            value={[filter.dateFrom, filter.dateTo]}
            onChange={handleDateChange}
          />
        </div>
        <div className='filterNotification-item'>
          <label className='filterNotification-label'>Notification Type</label>
          <Select
            // className='filterNotification-input'
            mode='multiple'
            defaultValue={
              filter.notificationType === null
                ? []
                : filter.notificationType.map((x) => NotificationType[x])
            }
            size='large'
            style={{ width: "100%" }}
            onChange={handleFilterType}
            options={[
              { value: NotificationType[0], label: NotificationType[0] },
              { value: NotificationType[1], label: NotificationType[1] },
              { value: NotificationType[2], label: NotificationType[2] },
              { value: NotificationType[3], label: NotificationType[3] },
              { value: NotificationType[4], label: NotificationType[4] },
              { value: NotificationType[5], label: NotificationType[5] },
            ]}
          />
        </div>
        <div className='filterNotification-item'>
          <label className='filterNotification-label'>Order type</label>
          <Select
            className='filterNotification-input'
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
        <div className='filterNotification-item function'>
          <div className='filterNotification-button cancel' onClick={onClose}>
            Cancel
          </div>
          <div
            className='filterNotification-button apply'
            onClick={onApplyFilter}
          >
            Apply
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationFilter;
