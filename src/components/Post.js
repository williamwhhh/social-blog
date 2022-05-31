import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Avatar, Row, Col, Form, Input, Button, Image } from 'antd';
import {
  CommentOutlined,
  HeartOutlined,
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
    margin: '5% 0 0 30%',
  },
  repostButton: {
    margin: '0 0 0 10%',
  },
  likeButton: {
    margin: '0 0 0 10%',
  },
});

const Post = forwardRef(
  ({ displayName, username, text, image, avatar }, ref) => {
    const classes = useStyles();
    return (
      <div ref={ref}>
        <Row>
          <Col span={4}>
            <Avatar
              className={classes.avatar}
              size={50}
              src={require(`../images/${avatar}`)}
            />
          </Col>
          <Col span={20}>
            <h3 className={classes.displayName}>
              {displayName}{' '}
              <span className={classes.username}>@{username}</span>
            </h3>
            <p>{text}</p>
            <Image.PreviewGroup>
              <Image width={200} src={require(`../images/${image}`)} />
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
            <Button
              className={classes.commentButton}
              shape="circle"
              icon={<CommentOutlined />}
            ></Button>
            <Button
              className={classes.repostButton}
              shape="circle"
              icon={<ShareAltOutlined />}
            ></Button>
            <Button
              className={classes.likeButton}
              shape="circle"
              icon={<HeartOutlined />}
            ></Button>
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
