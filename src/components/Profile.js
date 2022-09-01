import { createUseStyles } from 'react-jss';
import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Avatar,
  Button,
  Tabs,
  Input,
  Modal,
  Upload,
  Form,
  DatePicker,
} from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';
import Post from './Post';
import FlipMove from 'react-flip-move';
import { getAllPosts, editAvatar } from '../utils/APIs';

const useStyles = createUseStyles({
  avatar: {
    margin: '10% 0 0 5%',
  },
  pageHeading: {
    margin: '2% 0 2% 5%',
  },
  profileDetails: {
    margin: '2% 0 0 5%',
  },
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '80%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
});

const { TabPane } = Tabs;

const Profile = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
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
  }, [user]);

  const onFinish = (values) => {
    setEditProfile(false);
    console.log(values);
    // setUser({ ...user, name: values.name, dateOfBirth: values.DOB });
  };

  const handleCancel = () => {
    setEditProfile(false);
  };

  const handleUpload = (info) => {
    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('avatar', info.file);
    editAvatar(formData).then(
      (res) => {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...user, avatar: res.avatar })
        );
        setUser({ ...user, avatar: res.avatar });
      },
      (err) => {
        console.log(err.message);
      }
    );
  };

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <Row>
          <h2 className={classes.pageHeading}>
            <b>My Profile</b>
          </h2>
        </Row>
        <Row>
          <Avatar
            className={classes.avatar}
            size={120}
            src={
              user.avatar ? `http://localhost:3001/images/${user.avatar}` : null
            }
            icon={<UserOutlined />}
          />
        </Row>
        <Row>
          <h2 className={classes.profileDetails}>
            {user.name} <br />
            <span style={{ fontSize: '14px', color: 'grey' }}>
              @{user.username}
            </span>
          </h2>
          <Button
            style={{ position: 'relative', top: '3vh', left: '55%' }}
            type="primary"
            shape="round"
            onClick={() => setEditProfile(!editProfile)}
          >
            Edit Profile
          </Button>
          <Modal
            title="Edit Profile"
            visible={editProfile}
            // onOk={handleOk}
            okButtonProps={{
              form: 'editProfile',
              key: 'submit',
              htmlType: 'submit',
            }}
            onCancel={handleCancel}
            style={{
              top: '25%',
            }}
          >
            <Avatar
              size={100}
              icon={<UserOutlined />}
              src={
                user.avatar
                  ? `http://localhost:3001/images/${user.avatar}`
                  : null
              }
              style={{ marginLeft: '20%' }}
            ></Avatar>
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button style={{ marginLeft: '20%' }}>Change Avatar</Button>
            </Upload>
            <Form
              layout="vertical"
              wrapperCol={{ span: 24 }}
              name="editProfile"
              id="editProfile"
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="Name"
                style={{ marginTop: '5%', marginLeft: '10%', width: '80%' }}
                rules={[
                  {
                    required: true,
                    message: "Name can't be blank",
                  },
                ]}
                initialValue={user.name}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>
              <Form.Item
                name="DOB"
                label="Date of Birth"
                style={{ marginLeft: '10%' }}
                initialValue={moment(user.DOB)}
              >
                <DatePicker style={{ width: '50%' }} />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Button size="small" style={{ margin: '2% 0 0 4%' }} type="link">
            {0} Following
          </Button>
          <Button size="small" style={{ margin: '2% 0 0 0' }} type="link">
            {0} Followers
          </Button>
        </Row>
        <Row>
          <Tabs
            style={{ width: '100%', marginTop: '2%' }}
            defaultActiveKey="1"
            centered
            size="large"
            tabBarGutter={70}
          >
            <TabPane tab={<b>Posts</b>} key="1">
              <FlipMove>
                {posts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    username={post.username}
                    text={post.text}
                    avatar={post.avatar}
                    images={post.images}
                  />
                ))}
              </FlipMove>
            </TabPane>
            <TabPane tab={<b>Media</b>} key="2">
              <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
                When you send posts with photos or videos in them, <br />
                it will show up here.
              </h3>
            </TabPane>
            <TabPane tab={<b>Likes</b>} key="3">
              <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
                Tap the heart on any post to show it some love. <br />
                When you do, it’ll show up here.
              </h3>
            </TabPane>
          </Tabs>
        </Row>
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

export default Profile;
