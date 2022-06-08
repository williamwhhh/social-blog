import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Avatar, Row, Col, Form, Input, Button, Image } from 'antd';
import {
  MessageOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
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

const Post = forwardRef(
  ({ displayName, username, text, images, avatar }, ref) => {
    const classes = useStyles();
    const [like, setLike] = useState(false);
    const handleClick = () => {};

    return (
      <div ref={ref} onClick={handleClick} className={classes.container}>
        <Row>
          <Col span={4}>
            <Avatar
              className={classes.avatar}
              size={50}
              src={avatar !== '' ? require(`../images/${avatar}`) : ''}
              icon={<UserOutlined />}
            />
          </Col>
          <Col span={20}>
            <h3 className={classes.displayName}>
              {displayName}{' '}
              <span className={classes.username}>@{username}</span>
            </h3>
            <p>{text}</p>
            <Image.PreviewGroup>
              {images.map((image) => (
                <Image width={200} src={require(`../images/${image}`)} />
              ))}
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
            <br />
            <Row>
              <Button
                className={classes.commentButton}
                shape="circle"
                icon={<MessageOutlined />}
              ></Button>
              <Button
                className={classes.repostButton}
                shape="circle"
                icon={<ShareAltOutlined />}
              ></Button>
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
  }
);

export default Post;
