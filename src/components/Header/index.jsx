import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "stores/auth/auth.selector";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "stores/auth/auth.action";
import "./index.scss";
import Logo from "assets/images/logo.png";

const Header = () => {
  const user = useSelector(selectUser());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div onClick={handleLogout}>
              <span>Logout</span>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className="header-inner">
      <div className="logo-wrapper">
        <img src={Logo} alt="logo" className="logo" />
        <h2>Kanban Board</h2>
      </div>
      {!!user && (
        <div className="user">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottom"
            overlayClassName="custom-dropdown"
          >
            <div className="user-dropdown">
              <Space>
                <p className="username">{user.toJS().name || user.toJS().email}</p>
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Header;
