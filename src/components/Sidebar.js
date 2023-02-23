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
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('Home', 'home', <HomeOutlined style={{ fontSize: '1.2em' }} />),
    getItem(
      'Notification',
      'notification',
      <NotificationOutlined style={{ fontSize: '1.2em' }} />
    ),
    getItem(
      'Messages',
      'messages',
      <MessageOutlined style={{ fontSize: '1.2em' }} />
    ),
    getItem(
      'Bookmarks',
      'bookmarks',
      <BookOutlined style={{ fontSize: '1.2em' }} />
    ),
    getItem(
      'Profile',
      'profile',
      <UserOutlined style={{ fontSize: '1.2em' }} />
    ),
  ];
  return (
    <>
      <Col
        xs={3}
        sm={3}
        xl={{ span: collapsed ? 2 : 3 }}
        // flex={collapsed ? '80px' : '200px'}
        style={{ zIndex: '100' }}
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
        <Menu
          defaultSelectedKeys={[window.location.pathname.slice(1)]}
          mode="inline"
          inlineCollapsed={collapsed}
          onClick={handleClick}
          items={items}
          style={{
            height: '100%',
            minHeight: '100vh',
            fontSize: '1.2em',
            minWidth: collapsed ? '100%' : '200px',
            width: '100%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30%',
            minWidth: collapsed ? '100%' : '200px',
          }}
        >
          {!collapsed && (
            <Button
              type="primary"
              style={{
                display: 'flex',
                bottom: '30%',
                margin: '0 auto 0 auto',
              }}
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/');
              }}
            >
              <span style={{ margin: '0 auto 0 auto' }}>Logout</span>
            </Button>
          )}
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
