// import { createUseStyles } from "react-jss";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Row, Col } from "antd";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Row>
        <Col
          flex={collapsed ? "80px" : "200px"}
          style={{ margin: "1% 0 0 3%" }}
        >
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </>
  );
};

export default Home;
