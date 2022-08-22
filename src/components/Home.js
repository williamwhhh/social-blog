import { createUseStyles } from 'react-jss';
import { useState, forwardRef } from 'react';
import { Row, Col, Input, Image } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({});

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([
    {
      key: '0001',
      name: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      images: ['sharkBay.jpeg'],
      avatar: 'kangaroo.jpeg',
    },
    {
      key: '0002',
      name: 'Australia',
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
      <Col xs={20} sm={20} md={21} lg={14}>
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
              key={post.key}
              name={post.name}
              username={post.username}
              avatar={post.avatar}
              text={post.text}
              images={post.images}
            />
          ))}
        </FlipMove>
      </Col>
      <Col
        xs={{ span: 20, offset: 3 }}
        sm={{ span: 20, offset: 3 }}
        md={{ span: 21, offset: 3 }}
        lg={{ span: 7, offset: 0 }}
        style={{ borderLeft: 'solid RGB(238,238,238)' }}
      >
        <InfoBar />
      </Col>
    </Row>
  );
};

export default Home;
