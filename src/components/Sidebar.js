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
  const [collapsed, setCollapsed] = useState(true);
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
        xl={{ span: collapsed ? 2 : 3 }}
        // flex={collapsed ? '80px' : '200px'}
        style={{ zIndex: '100' }}
      >
        <Menu
          defaultSelectedKeys={[window.location.pathname.slice(1)]}
          mode="inline"
          inlineCollapsed={collapsed}
          onClick={handleClick}
          style={{
            height: '100%',
            minHeight: '100vh',
            fontSize: '1.2em',
            minWidth: collapsed ? '100%' : '200px',
            width: '100%',
          }}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              position: 'relative',
              margin: '2vh 0 5% 0',
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
          {!collapsed && (
            <Button
              type="primary"
              style={{
                display: 'flex',
                margin: '50vh auto 0 auto',
              }}
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/');
              }}
            >
              <span style={{ margin: '0 auto 0 auto' }}>Logout</span>
            </Button>
          )}
        </Menu>
      </Col>
    </>
  );
};

export default Sidebar;
