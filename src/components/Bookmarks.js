import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Row, Col, message } from 'antd';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';
import Post from './Post';
import { getBookmarks, getLikedPosts } from '../utils/APIs';

const useStyles = createUseStyles({
  pageHeading: {
    margin: '2% 0 2% 5%',
  },
});

const Bookmarks = () => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getBookmarks({
      email: JSON.parse(localStorage.getItem('user')).email,
    })
      .then(
        (res) => {
          if (res.bookmarks) {
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
            setBookmarks(res.bookmarks.reverse());
            setLikedPosts(res2.likedPosts.reverse());
          },
          (err) => message.error(err.message)
        );
      });
  }, []);

  const updateBookmarks = () => {
    getBookmarks({
      email: JSON.parse(localStorage.getItem('user')).email,
    }).then(
      (res) => {
        setBookmarks(res.bookmarks.reverse());
      },
      (err) => message.error(err.message)
    );
  };

  const checkIsLiked = (id) => {
    for (let i in likedPosts) {
      if (likedPosts[i]._id === id) {
        return true;
      }
    }
    return false;
  };

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <h2 className={classes.pageHeading}>
          <b>Bookmarks</b>
        </h2>
        <FlipMove>
          {bookmarks.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              name={post.name}
              username={post.username}
              avatar={post.avatar}
              text={post.text}
              images={post.images}
              updateBookmarks={updateBookmarks}
              like={checkIsLiked(post._id)}
            />
          ))}
        </FlipMove>
        <h2 style={{ margin: '20% 0 0 0', textAlign: 'center' }}>
          <b>Save posts for later</b>
        </h2>
        <h3 style={{ margin: '5% 0 20% 0', textAlign: 'center' }}>
          Don’t let the good ones fly away! Bookmark <br />
          posts to easily find them again in the future.
        </h3>
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

export default Bookmarks;
