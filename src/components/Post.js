import React, { forwardRef, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Row,
  Col,
  Button,
  Image,
  Tooltip,
  Dropdown,
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
  removePost,
  likePost,
  unlikePost,
} from '../utils/APIs';

const useStyles = createUseStyles({
  container: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgb(238,238,238)' },
  },
});

const Post = forwardRef(({ ...props }, ref) => {
  const classes = useStyles();
  const [like, setLike] = useState(props.like ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(() => {
    setLike(props.like);
  }, [props.like]);

  const handleMenuClick = (e) => {
    e.domEvent.stopPropagation();
    if (e.key === '1') {
      if (user.bookmarks.includes(props.post._id)) {
        removeBookmark({ email: user.email, postId: props.post._id }).then(
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
        bookmark({ email: user.email, postId: props.post._id }).then(
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
    e.domEvent.stopPropagation();
    if (e.key === '1' && user.username === props.post.username) {
      removePost({ id: props.post._id, images: props.post.images }).then(
        (res) => {
          message.success(res.message);
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
      likePost({ email: user.email, postId: props.post._id }).then(
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
    } else {
      unlikePost({ email: user.email, postId: props.post._id }).then(
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

  const handleClick = () => {
    navigate(`/post/${props.post._id}`);
  };

  return (
    <div ref={ref} onClick={handleClick} className={classes.container}>
      <Row>
        <Col xs={6} sm={3}>
          <Avatar
            style={{ margin: '2vh 0 0 40%' }}
            size={55}
            icon={<UserOutlined />}
            src={
              props.post.avatar
                ? `http://localhost:3001/images/${props.post.avatar}`
                : null
            }
          />
        </Col>
        <Col xs={{ span: 17, offset: 1 }} sm={20}>
          <Dropdown
            menu={{
              onClick: handleDotMenuClick,
              items: [
                {
                  label:
                    user.username === props.post.username
                      ? 'Delete this post'
                      : 'Not interested in this post',
                  key: '1',
                  icon:
                    user.username === props.post.username ? (
                      <DeleteOutlined />
                    ) : (
                      <FrownOutlined />
                    ),
                },
              ],
            }}
            trigger={['click']}
          >
            <Button
              type="link"
              shape="circle"
              size="large"
              onClick={(event) => event.stopPropagation()}
              icon={
                <EllipsisOutlined
                  style={{ fontSize: '25px', color: 'black', zIndex: '100' }}
                />
              }
              style={{ float: 'right', marginRight: '5%' }}
            ></Button>
          </Dropdown>
          <h3 style={{ margin: '1vh 0 0 0' }}>
            {props.post.name}{' '}
            <span style={{ margin: '1vh 0 0 1vw', color: 'grey' }}>
              @{props.post.username}
            </span>
          </h3>

          <p style={{ width: '95%' }}>{props.post.text}</p>
          <Image.PreviewGroup>
            {props.post.images.map((image) => {
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
                style={{ margin: 'auto', marginTop: '3%' }}
                shape="circle"
                icon={<MessageOutlined />}
                onClick={(event) => event.stopPropagation()}
              ></Button>
            </Tooltip>
            <Tooltip title="Repost">
              <Button
                style={{ margin: 'auto', marginTop: '3%' }}
                shape="circle"
                icon={<RetweetOutlined />}
                onClick={(event) => event.stopPropagation()}
              ></Button>
            </Tooltip>
            <Tooltip title="Like">
              <Button
                style={{ margin: 'auto', marginTop: '3%' }}
                shape="circle"
                icon={
                  like ? (
                    <HeartFilled style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={(event) => {
                  handleLikeBtn();
                  setLike(!like);
                  event.stopPropagation();
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Share">
              <Dropdown
                menu={{
                  onClick: handleMenuClick,
                  items: [
                    {
                      label: user.bookmarks.includes(props.post._id)
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
                  ],
                }}
                trigger={['click']}
              >
                <Button
                  style={{ margin: 'auto', marginTop: '3%' }}
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  onClick={(event) => event.stopPropagation()}
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
});

export default Post;
