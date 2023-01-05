import { createUseStyles } from 'react-jss';
import { useState, forwardRef, useEffect } from 'react';
import { Row, Col, Input, Image } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';
import { getAllPosts } from '../utils/APIs';

const useStyles = createUseStyles({});

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const updatePosts = () => {
    getAllPosts().then(
      (res) => {
        if (res.posts) {
          setPosts(res.posts.reverse());
        } else {
          console.log(res.messages);
        }
      },
      (err) => {
        console.log(err.messages);
      }
    );
  };

  useEffect(() => updatePosts, []);

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <Row>
          <h2 style={{ margin: '2% 0 0 5%' }}>
            <b>Home</b>
          </h2>
        </Row>
        <PostBox updatePosts={updatePosts} />
        <hr
          style={{
            border: '1px solid RGB(238,238,238)',
            margin: '1vh 0 1vh 0',
          }}
        ></hr>
        <FlipMove>
          {posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              name={post.name}
              username={post.username}
              avatar={post.avatar}
              text={post.text}
              images={post.images}
              updatePosts={updatePosts}
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
