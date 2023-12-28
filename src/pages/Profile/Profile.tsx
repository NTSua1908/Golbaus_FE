import React from "react";
import MenuLeft, { MenuItem } from "../../components/MenuLeft/MenuLeft";
import { FaHistory, FaUser } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

const menuItems: MenuItem[] = [
  {
    title: "Profile",
    icon: <FaUser />,
    onClick: () => {},
  },
  {
    title: "Posts",
    icon: <BsPostcard />,
    onClick: () => {},
  },
  {
    title: "Activity",
    icon: <FaHistory />,
    onClick: () => {},
  },
  {
    title: "Setting",
    icon: <IoSettings />,
    onClick: () => {},
  },
];

function Profile() {
  return (
    <div className="profile">
      <MenuLeft
        items={menuItems}
        avartar="https://i.pinimg.com/736x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg"
        fullName="Nguyen Thien Sua"
        userName="NTSua1908"
      />
    </div>
  );
}

export default Profile;
