import { createUseStyles } from 'react-jss';
import { useState, forwardRef } from 'react';
import { Row, Col, Input, Image } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '80%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
});

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      images: ['sharkBay.jpeg'],
      avatar: 'kangaroo.jpeg',
    },
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative).",
      images: ['kangaroo.jpeg'],
      avatar: 'kangaroo.jpeg',
    },
  ]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <Row>
      <Sidebar />
      <Col span={13}>
        <Row>
          <h2 style={{ margin: '2% 0 0 5%' }}>
            <b>Home</b>
          </h2>
        </Row>
        <PostBox addPost={addPost} />
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
              images={post.images}
            />
          ))}
        </FlipMove>
      </Col>
      <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
        <InfoBar />
      </Col>
    </Row>
  );
};

export default Home;
