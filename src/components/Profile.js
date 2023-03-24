import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  message,
} from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';
import Post from './Post';
import { getMyPosts, editProfile, getLikedPosts } from '../utils/APIs';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [avatarFile, setAvatarFile] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getMyPosts({ username: JSON.parse(localStorage.getItem('user')).username })
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
        (err) => {
          message.error(err.message);
        }
      )
      .then((res) => {
        getLikedPosts({
          email: JSON.parse(localStorage.getItem('user')).email,
        }).then(
          (res2) => {
            setPosts(res.posts.reverse());
            setLikedPosts(res2.likedPosts.reverse());
          },
          (err) => console.log(err.message)
        );
      });
  }, []);

  const onFinish = (values) => {
    setEditingProfile(false);
    let formData = new FormData();
    formData.append('username', user.username);
    formData.append('name', values.name);
    formData.append('DOB', values.DOB);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    editProfile(formData).then(
      (res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify({ ...user, ...res }));
        setUser({ ...user, ...res });
        setAvatarFile(null);
        message.success('Profile updated');
        window.location.reload(false);
      },
      (err) => {
        console.log(err);
        message.error(err.message);
      }
    );
  };

  const updateLikedPosts = () => {
    getLikedPosts({
      email: JSON.parse(localStorage.getItem('user')).email,
    }).then(
      (res) => {
        setLikedPosts(res.likedPosts.reverse());
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

  const handleCancel = () => {
    setAvatarFile(null);
    setEditingProfile(false);
  };

  const tabItems = [
    {
      key: '1',
      label: <b>Posts</b>,
      children: posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          like={checkIsLiked(post._id)}
          updateLikedPosts={updateLikedPosts}
        />
      )),
    },
    {
      key: '2',
      label: <b>Media</b>,
      children: (
        <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
          When you send posts with photos or videos in them, <br />
          it will show up here.
        </h3>
      ),
    },
    {
      key: '3',
      label: <b>Likes</b>,
      children:
        likedPosts.length !== 0 ? (
          likedPosts.map((post) => (
            <Post
              key={post._id}
              post={post}
              like={true}
              updateLikedPosts={updateLikedPosts}
            />
          ))
        ) : (
          <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
            When you like a post, <br />
            it will show up here.
          </h3>
        ),
    },
  ];

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <Row>
          <h2 style={{ margin: '2% 0 2% 5%' }}>
            <b>My Profile</b>
          </h2>
        </Row>
        <Row>
          <Avatar
            style={{ margin: '10% 0 0 5%' }}
            size={120}
            src={
              user.avatar ? `http://localhost:3001/images/${user.avatar}` : null
            }
            icon={<UserOutlined />}
          />
        </Row>
        <Row>
          <h2 style={{ margin: '2% 0 0 5%' }}>
            {user.name} <br />
            <span style={{ fontSize: '14px', color: 'grey' }}>
              @{user.username}
            </span>
          </h2>
          <Button
            style={{ position: 'absolute', right: '10%', marginTop: '2%' }}
            type="primary"
            shape="round"
            onClick={() => setEditingProfile(!editingProfile)}
          >
            Edit Profile
          </Button>

          <Modal
            title="Edit Profile"
            open={editingProfile}
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
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : `http://localhost:3001/images/${user.avatar}`
              }
              style={{ marginLeft: '20%' }}
            ></Avatar>
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => setAvatarFile(info.file)}
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
            centered={true}
            size="large"
            tabBarGutter={70}
            items={tabItems}
          />
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
