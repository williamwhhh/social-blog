// import { createUseStyles } from "react-jss";
import { useState } from 'react';
import { Button, Menu, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Col
        xs={3}
        sm={3}
        xl={{ span: collapsed ? 2 : 3, offset: 1 }}
        // flex={collapsed ? '80px' : '200px'}
      >
        <Menu
          defaultSelectedKeys={[window.location.pathname.slice(1)]}
          mode="inline"
          inlineCollapsed={collapsed}
          onClick={handleClick}
          style={{
            height: '98vh',
            fontSize: '1.2em',
            position: 'relative',
            top: '2vh',
            width: collapsed ? '100%' : '200px',
            zIndex: '100',
          }}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              position: 'relative',
              zIndex: '100',
              margin: '0 0 5% 0',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
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
      </Col>
    </>
  );
};

export default Sidebar;
