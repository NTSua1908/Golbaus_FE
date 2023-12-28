import React, { ReactNode, useState } from "react";
import "./menuLeft.scss";
import { FaAngleLeft } from "react-icons/fa";

export interface MenuItem {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

interface MenuLetProps {
  items: MenuItem[];
  avartar: string;
  fullName: string;
  userName: string;
}

function MenuLeft({ items, avartar, fullName, userName }: MenuLetProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHidden, setHidden] = useState(false);

  const handleSelectMenuItem = (index: number, onClick: () => void) => {
    setSelectedIndex(index);
    onClick();
  };

  const handleHideMenu = () => {
    setHidden(!isHidden);
  };

  return (
    <div className={`menu-left ${isHidden && "hidden"}`}>
      <div className="menu-left-container">
        <div className="menu-left-header">
          <div className="menu-left-header-avatar">
            <img src={avartar} alt="" />
          </div>
          <div className="menu-left-header-info">
            <h3 className="menu-left-header-info-fullname">{fullName}</h3>
            <span className="menu-left-header-info-username">@{userName}</span>
          </div>
        </div>
        <div className="menu-left-body">
          {items.map((item, index) => (
            <div
              key={index}
              className={`menu-left-body-item ${
                index == selectedIndex && "active"
              }`}
              onClick={() => {
                handleSelectMenuItem(index, item.onClick);
              }}
            >
              <div className="menu-left-body-item-icon">{item.icon}</div>
              <div className="menu-left-body-item-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`menu-left-toggle ${isHidden && "hidden"}`}
        onClick={handleHideMenu}
      >
        <FaAngleLeft />
      </div>
    </div>
  );
}

export default MenuLeft;
