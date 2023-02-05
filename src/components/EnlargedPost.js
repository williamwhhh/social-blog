import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ArrowLeftOutlined,
} from '@ant-design/icons';
import {
  bookmark,
  removeBookmark,
  removePost,
  likePost,
  unlikePost,
  getPost,
} from '../utils/APIs';
import { createUseStyles } from 'react-jss';
import FlipMove from 'react-flip-move';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';
import ReplyBox from './ReplyBox';
import Comment from './Comment';

const useStyles = createUseStyles({});

const EnlargedPost = (props) => {
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [post, setPost] = useState({
    _id: '',
    name: '',
    username: '',
    text: '',
    images: [],
    avatar: '',
    comments: [],
  });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(postId).then((res) => {
      res.post.comments.reverse();
      setPost(res.post);
    });
  }, []);

  const updateComments = (comments) => {
    setPost({ ...post, comments: comments });
  };

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      if (user.bookmarks.includes(post._id)) {
        removeBookmark({ email: user.email, postId: post._id }).then(
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
      } else {
        bookmark({ email: user.email, postId: post._id }).then(
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
    if (e.key === '1' && user.username === post.username) {
      removePost({ id: post._id, images: post.images }).then(
        (res) => {
          message.success(res.message);
          navigate(-1);
          // window.location.reload(false);
        },
        (err) => {
          message.error(err.message);
        }
      );
    }
  };

  const handleLikeBtn = () => {
    if (!like) {
      likePost({ email: user.email, postId: post._id }).then(
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
      unlikePost({ email: user.email, postId: post._id }).then(
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
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: user.bookmarks.includes(post._id)
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
            user.username === post.username
              ? 'Delete this post'
              : 'Not interested in this post',
          key: '1',
          icon:
            user.username === post.username ? (
              <DeleteOutlined />
            ) : (
              <FrownOutlined />
            ),
        },
      ]}
    />
  );

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <Row>
          <Button
            type="link"
            href="/home"
            style={{ margin: '2% 0 0 2%' }}
            icon={
              <ArrowLeftOutlined
                style={{
                  fontSize: '18px',
                  color: 'black',
                }}
              />
            }
          ></Button>
          <h2 style={{ margin: '2% 0 0 5%' }}>
            <b>Post</b>
          </h2>
        </Row>
        <hr
          style={{
            border: '1px solid RGB(238,238,238)',
            margin: '1vh 0 1vh 0',
          }}
        ></hr>
        <Row>
          <Col xs={6} sm={3}>
            <Avatar
              style={{ margin: '2vh 0 0 40%' }}
              size={55}
              icon={<UserOutlined />}
              src={
                post.avatar
                  ? `http://localhost:3001/images/${post.avatar}`
                  : null
              }
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
                style={{ float: 'right', margin: '2% 5%' }}
              ></Button>
            </Dropdown>
            <h3 style={{ margin: '2vh 0 0 0' }}>{post.name} </h3>
            <p style={{ color: 'grey' }}>@{post.username}</p>
            <p style={{ width: '95%' }}>{post.text}</p>
            <Image.PreviewGroup>
              {post.images.map((image) => {
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
            <br />
            <span style={{ color: 'grey' }}>{post.dateTime}</span>

            <Row>
              <Tooltip title="Comment">
                <Button
                  style={{ margin: 'auto', marginTop: '3%' }}
                  shape="circle"
                  icon={<MessageOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title="Repost">
                <Button
                  style={{ margin: 'auto', marginTop: '3%' }}
                  shape="circle"
                  icon={<RetweetOutlined />}
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
                  onClick={() => {
                    handleLikeBtn();
                    setLike(!like);
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title="Share">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button
                    style={{ margin: 'auto', marginTop: '3%' }}
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
        <ReplyBox postId={post._id} updateComments={updateComments} />
        <hr
          style={{
            margin: '2vh 0 1vh 0',
            border: '1px solid RGB(238,238,238)',
          }}
        ></hr>
        <FlipMove>
          {post.comments.map((comment) => (
            <Comment
              key={comment.username.concat(comment.text)}
              postId={post._id}
              name={comment.name}
              username={comment.username}
              avatar={comment.avatar}
              text={comment.text}
              images={comment.images}
              dateTime={comment.dateTime}
              updateComments={updateComments}
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

export default EnlargedPost;
