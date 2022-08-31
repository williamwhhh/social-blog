import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Avatar, Row, Col, Form, Input, Button, Image, Tooltip } from 'antd';
import {
  MessageOutlined,
  HeartOutlined,
  HeartFilled,
  RetweetOutlined,
  UserOutlined,
} from '@ant-design/icons';

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

const Post = forwardRef(({ name, username, text, images, avatar }, ref) => {
  const classes = useStyles();
  const [like, setLike] = useState(false);
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
                  setLike(!like);
                }}
              ></Button>
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <hr
        style={{
          margin: '2vh 0 0 0',
          border: '1px solid RGB(238,238,238)',
        }}
      ></hr>
    </div>
  );
});

export default Post;
