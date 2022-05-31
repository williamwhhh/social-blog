// import { createUseStyles } from "react-jss";
import { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import FlipMove from 'react-flip-move';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const posts = [
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      image: 'sharkBay.jpeg',
      avatar: 'kangaroo.jpeg',
    },
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      image: 'sharkBay.jpeg',
      avatar: 'kangaroo.jpeg',
    },
  ];
  return (
    <>
      <Row>
        <Col flex={collapsed ? '80px' : '200px'} style={{ margin: '0 0 0 3%' }}>
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Col>
        <Col span={13}>
          <PostBox />
          <hr
            style={{
              border: '1px solid RGB(238,238,238)',
            }}
          ></hr>
          <FlipMove>
            {posts.map((post) => (
              <Post
                key={post.text}
                displayName={post.displayName}
                username={post.username}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
              />
            ))}
          </FlipMove>
        </Col>
        <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
          What's happening
        </Col>
      </Row>
    </>
  );
};

export default Home;
