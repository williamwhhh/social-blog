// import { createUseStyles } from "react-jss";
import { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Row>
        <Col
          flex={collapsed ? '80px' : '200px'}
          style={{ margin: '1% 0 0 3%' }}
        >
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Col>
        <Col span={13}>
          <PostBox />
        </Col>
        <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
          What's happening
        </Col>
      </Row>
    </>
  );
};

export default Home;
