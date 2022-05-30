// import { createUseStyles } from "react-jss";
import { Button, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  NotificationOutlined,
  MessageOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Sidebar = (props) => {
  // const options = ['home', 'content', 'journal', 'classroom'];

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
        defaultSelectedKeys={['home']}
        mode="inline"
        inlineCollapsed={props.collapsed}
        onClick={handleClick}
        style={{ height: '90vh', fontSize: '1.2em' }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined style={{ fontSize: '1.2em' }} />}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="notification"
          icon={<NotificationOutlined style={{ fontSize: '1.2em' }} />}
        >
          Notification
        </Menu.Item>
        <Menu.Item
          key="messages"
          icon={<MessageOutlined style={{ fontSize: '1.2em' }} />}
        >
          Messages
        </Menu.Item>
        <Menu.Item
          key="bookmarks"
          icon={<BookOutlined style={{ fontSize: '1.2em' }} />}
        >
          Bookmarks
        </Menu.Item>
        <Menu.Item
          key="profile"
          icon={<UserOutlined style={{ fontSize: '1.2em' }} />}
        >
          Profile
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Sidebar;
