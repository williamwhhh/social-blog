import { createUseStyles } from 'react-jss';
import { Avatar, Row, Col, Form, Input, Button, Space } from 'antd';
import {
  UserOutlined,
  FileImageOutlined,
  SmileOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const useStyles = createUseStyles({
  avatar: {
    margin: '2vh 0 0 40%',
  },
  postInput: {
    margin: '3vh 0 0 0',
    width: '95%',
  },
  postButton: {
    float: 'right',
    margin: '1vh 2vw 1vh 0',
  },
  imageButton: {
    margin: '1.5vh 0 0 3%',
  },
  emojiButton: {
    margin: '1.5vh 0 0 3%',
  },
  locationButton: {
    margin: '1.5vh 0 0 3%',
  },
});

const PostBox = () => {
  const classes = useStyles();
  const [posting, setPosting] = useState(false);
  const [post, setPost] = useState(null);

  const handlePost = () => {
    // setPosting(true);
    console.log(post);
  };

  return (
    <>
      <Row>
        <h2 style={{ margin: '2% 0 0 5%' }}>Home</h2>
      </Row>
      <Row>
        <Col span={4}>
          <Avatar
            className={classes.avatar}
            size={50}
            icon={<UserOutlined />}
          />
        </Col>
        <Col span={20}>
          <Form name="register" onFinish={handlePost}>
            <Form.Item name="post" className={classes.postInput}>
              <Input.TextArea
                placeholder="What's happening?"
                bordered={false}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                size="large"
                onChange={(e) => setPost(e.target.value)}
              />
              <hr
                style={{
                  border: '1px solid RGB(238,238,238)',
                }}
              ></hr>
            </Form.Item>
            <Button
              className={classes.imageButton}
              type="primary"
              shape="circle"
              icon={<FileImageOutlined />}
            ></Button>
            <Button
              className={classes.emojiButton}
              type="primary"
              shape="circle"
              icon={<SmileOutlined />}
            ></Button>
            <Button
              className={classes.locationButton}
              type="primary"
              shape="circle"
              icon={<EnvironmentOutlined />}
            ></Button>
            <Form.Item className={classes.postButton}>
              <Button
                type="primary"
                htmlType="submit"
                loading={posting}
                size="large"
                shape="round"
              >
                {!posting ? 'Post' : 'Posting...'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default PostBox;
