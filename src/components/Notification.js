import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '70%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
});

const Notification = () => {
  const classes = useStyles();

  return (
    <Row>
      <Sidebar />
      <Col flex="auto">Notification Page</Col>
    </Row>
  );
};

export default Notification;
