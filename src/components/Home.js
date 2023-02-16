import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';
import { getAllPosts, getLikedPosts } from '../utils/APIs';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();
  const updatePosts = () => {
    getAllPosts()
      .then(
        (res) => {
          if (res.posts) {
            return res;
          } else {
            message.error(res.message);
            if (res.message === 'user session expired') {
              navigate('/');
            }
          }
        },
        (err) => message.error(err.message)
      )
      .then((res) => {
        getLikedPosts({
          email: JSON.parse(localStorage.getItem('user')).email,
        }).then(
          (res2) => {
            setPosts(res.posts.reverse());
            setLikedPosts(res2.likedPosts.reverse());
          },
          (err) => {
            console.log(err.message);
          }
        );
      });
  };

  const checkIsLiked = (id) => {
    for (let i in likedPosts) {
      if (likedPosts[i]._id === id) {
        return true;
      }
    }
    return false;
  };

  // eslint-disable-next-line
  useEffect(() => updatePosts(), []);

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
              post={post}
              updatePosts={updatePosts}
              like={checkIsLiked(post._id)}
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
