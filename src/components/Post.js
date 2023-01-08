import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import {
  Avatar,
  Row,
  Col,
  Button,
  Image,
  Tooltip,
  Dropdown,
  Menu,
  message,
} from 'antd';
import {
  MessageOutlined,
  HeartOutlined,
  HeartFilled,
  RetweetOutlined,
  UserOutlined,
  ShareAltOutlined,
  BookOutlined,
  LinkOutlined,
  EllipsisOutlined,
  FrownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  bookmark,
  removeBookmark,
  getBookmarks,
  removePost,
  likePost,
  unlikePost,
  getAllPosts,
} from '../utils/APIs';

const useStyles = createUseStyles({
  avatar: {
    margin: '2vh 0 0 40%',
  },
  username: {
    margin: '1vh 0 0 1vw',
    color: 'grey',
  },
  displayName: {
    margin: '1vh 0 0 0',
  },
  commentButton: {
    margin: 'auto',
    marginTop: '3%',
  },
  repostButton: {
    margin: 'auto',
    marginTop: '3%',
  },
  likeButton: {
    margin: 'auto',
    marginTop: '3%',
  },
  container: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgb(238,238,238)' },
  },
});

const Post = forwardRef(
  ({ id, name, username, text, images, avatar, ...props }, ref) => {
    const classes = useStyles();
    const [like, setLike] = useState(props.like ? true : false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const handleMenuClick = (e) => {
      if (e.key === '1') {
        if (user.bookmarks.includes(id)) {
          removeBookmark({ email: user.email, postId: id }).then(
            (res) => {
              setUser({ ...user, bookmarks: res.bookmarks });
              localStorage.setItem(
                'user',
                JSON.stringify({ ...user, bookmarks: res.bookmarks })
              );
              props.updateBookmarks();
              message.success(res.message);
            },
            (err) => message.error(err.message)
          );
        } else {
          bookmark({ email: user.email, postId: id }).then(
            (res) => {
              setUser({ ...user, bookmarks: res.bookmarks });
              localStorage.setItem(
                'user',
                JSON.stringify({ ...user, bookmarks: res.bookmarks })
              );
              message.success(res.message);
            },
            (err) => message.error(err.message)
          );
        }
      }
    };

    const handleDotMenuClick = (e) => {
      if (e.key === '1' && user.username === username) {
        removePost({ id: id, images: images }).then(
          (res) => {
            message.success(res.message);
            // window.location.reload(false);
            props.updatePosts();
          },
          (err) => {
            message.error(err.message);
          }
        );
      }
    };

    const handleLikeBtn = () => {
      if (!like) {
        likePost({ email: user.email, postId: id }).then(
          (res) => {
            setUser({ ...user, likedPosts: res.likedPosts });
            localStorage.setItem(
              'user',
              JSON.stringify({ ...user, likedPosts: res.likedPosts })
            );
            message.success(res.message);
          },
          (err) => message.error(err.message)
        );
      } else {
        unlikePost({ email: user.email, postId: id }).then(
          (res) => {
            setUser({ ...user, likedPosts: res.likedPosts });
            localStorage.setItem(
              'user',
              JSON.stringify({ ...user, likedPosts: res.likedPosts })
            );
            props.updateLikedPosts();
            message.success(res.message);
          },
          (err) => message.error(err.message)
        );
      }
    };

    const menu = (
      <Menu
        onClick={handleMenuClick}
        items={[
          {
            label: user.bookmarks.includes(id)
              ? 'Remove from Bookmarks'
              : 'Bookmark',
            key: '1',
            icon: <BookOutlined />,
          },
          {
            label: 'Copy link to this post',
            key: '2',
            icon: <LinkOutlined />,
          },
          {
            label: 'Send via messaging',
            key: '3',
            icon: <MessageOutlined />,
          },
        ]}
      />
    );

    const dotMenu = (
      <Menu
        onClick={handleDotMenuClick}
        items={[
          {
            label:
              user.username === username
                ? 'Delete this post'
                : 'Not interested in this post',
            key: '1',
            icon:
              user.username === username ? (
                <DeleteOutlined />
              ) : (
                <FrownOutlined />
              ),
          },
        ]}
      />
    );

    const handleClick = () => {};

    return (
      <div ref={ref} onClick={handleClick} className={classes.container}>
        <Row>
          <Col xs={6} sm={3}>
            <Avatar
              className={classes.avatar}
              size={55}
              icon={<UserOutlined />}
              src={avatar ? `http://localhost:3001/images/${avatar}` : null}
            />
          </Col>
          <Col xs={{ span: 17, offset: 1 }} sm={20}>
            <Dropdown overlay={dotMenu} trigger={['click']}>
              <Button
                type="link"
                shape="circle"
                size="large"
                icon={
                  <EllipsisOutlined
                    style={{ fontSize: '25px', color: 'black' }}
                  />
                }
                onClick={() => {}}
                style={{ float: 'right', marginRight: '5%' }}
              ></Button>
            </Dropdown>
            <h3 className={classes.displayName}>
              {name} <span className={classes.username}>@{username}</span>
            </h3>
            <p style={{ width: '95%' }}>{text}</p>
            <Image.PreviewGroup>
              {images.map((image) => {
                return (
                  <Image
                    width={200}
                    style={{ borderRadius: '20px' }}
                    src={`http://localhost:3001/images/${image}`}
                  />
                );
              })}
            </Image.PreviewGroup>
            <br />
            <Row>
              <Tooltip title="Comment">
                <Button
                  className={classes.commentButton}
                  shape="circle"
                  icon={<MessageOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title="Repost">
                <Button
                  className={classes.repostButton}
                  shape="circle"
                  icon={<RetweetOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title="Like">
                <Button
                  className={classes.likeButton}
                  shape="circle"
                  icon={
                    like ? (
                      <HeartFilled style={{ color: 'red' }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={() => {
                    handleLikeBtn();
                    setLike(!like);
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title="Share">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button
                    className={classes.likeButton}
                    shape="circle"
                    icon={<ShareAltOutlined />}
                    onClick={() => {}}
                  ></Button>
                </Dropdown>
              </Tooltip>
            </Row>
          </Col>
        </Row>
        <hr
          style={{
            margin: '2vh 0 1vh 0',
            border: '1px solid RGB(238,238,238)',
          }}
        ></hr>
      </div>
    );
  }
);

export default Post;
