// import { createUseStyles } from "react-jss";
import { Button, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  NotificationOutlined,
  MessageOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Sidebar = (props) => {
  const options = ["home", "content", "journal", "classroom"];

  const handleClick = () => {};

  return (
    <>
      <Button
        type="primary"
        onClick={props.toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={props.collapsed}
        onClick={handleClick}
        style={{ height: "90vh" }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="notification" icon={<NotificationOutlined />}>
          Notification
        </Menu.Item>
        <Menu.Item key="messages" icon={<MessageOutlined />}>
          Messages
        </Menu.Item>
        <Menu.Item key="bookmarks" icon={<BookOutlined />}>
          Bookmarks
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Sidebar;
