import { createUseStyles } from 'react-jss';
import { useState } from 'react';
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
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import TrendingPost from './TrendingPost';
import Post from './Post';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({
  avatar: {
    margin: '10% 0 0 5%',
  },
  profileHeading: {
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

const trending = [
  {
    title: '#Australia',
    image: 'sharkBay.jpeg',
    numOfHit: '2.3k',
  },
  {
    title: '#Australia',
    image: 'sharkBay.jpeg',
    numOfHit: '2.3k',
  },
  {
    title: '#Australia',
    image: 'sharkBay.jpeg',
    numOfHit: '2.3k',
  },
  {
    title: '#Australia',
    image: 'sharkBay.jpeg',
    numOfHit: '2.3k',
  },
  {
    title: '#Australia',
    image: 'sharkBay.jpeg',
    numOfHit: '2.3k',
  },
];

const onSearch = () => {};

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: 'Australia',
    username: 'Australia',
    following: [],
    followers: [],
    avatar: 'kangaroo.jpeg',
    dateOfBirth: '2022-07-06',
    posts: [
      {
        displayName: 'Australia',
        username: 'Australia',
        text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
        images: ['sharkBay.jpeg'],
        avatar: 'kangaroo.jpeg',
      },
      {
        displayName: 'Australia',
        username: 'Australia',
        text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative).",
        images: ['kangaroo.jpeg'],
        avatar: 'kangaroo.jpeg',
      },
    ],
  });
  const [editProfile, setEditProfile] = useState(false);

  const handleOk = () => {
    setEditProfile(false);
  };

  const handleCancel = () => {
    setEditProfile(false);
  };

  return (
    <Row>
      <Sidebar />
      <Col span={13}>
        <Row>
          <h2 className={classes.profileHeading}>
            <b>My Profile</b>
          </h2>
        </Row>
        <Row>
          <Avatar
            className={classes.avatar}
            size={120}
            src={require(`../images/${user.avatar}`)}
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
            onOk={handleOk}
            onCancel={handleCancel}
            style={{
              top: '25%',
            }}
          >
            <Upload showUploadList={false}>
              <Avatar
                size={100}
                src={
                  user.avatar !== '' ? require(`../images/${user.avatar}`) : ''
                }
                icon={<UploadOutlined />}
              ></Avatar>
            </Upload>
            <Form
              layout="vertical"
              wrapperCol={{ span: 24 }}
              name="editProfile"
            >
              <Form.Item
                label="Name"
                style={{ marginTop: '5%' }}
                rules={[
                  {
                    required: true,
                    message: "Name can't be blank",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your name"
                  size="large"
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  value={user.name}
                />
              </Form.Item>
              <Form.Item label="Date of Birth">
                <DatePicker
                  style={{ width: '50%' }}
                  defaultValue={moment(user.dateOfBirth)}
                  onChange={(date, dateString) =>
                    setUser({ ...user, dateOfBirth: dateString })
                  }
                />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Button size="small" style={{ margin: '2% 0 0 4%' }} type="link">
            {user.following.length} Following
          </Button>
          <Button size="small" style={{ margin: '2% 0 0 0' }} type="link">
            {user.following.length} Followers
          </Button>
        </Row>
        <Row>
          <Tabs
            style={{ width: '100%', marginTop: '2%' }}
            defaultActiveKey="1"
            centered
            size="large"
            tabBarGutter={100}
          >
            <TabPane tab={<b>Posts</b>} key="1">
              <FlipMove>
                {user.posts.map((post) => (
                  <Post
                    key={post.text}
                    displayName={post.displayName}
                    username={post.username}
                    verified={post.verified}
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
      <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
        <Row>
          <Input.Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            size="large"
            style={{
              width: '80%',
              margin: '10% 0 0 10%',
            }}
          />
        </Row>
        <Row>
          <div className={classes.topTrendingBox}>
            <h3 style={{ margin: '3% 0 0 5%' }}>
              <b>Top Trending</b>
            </h3>
            <FlipMove>
              {trending.map((t) => (
                <TrendingPost
                  key={t.text}
                  title={t.title}
                  image={t.image}
                  numOfHit={t.numOfHit}
                />
              ))}
            </FlipMove>
          </div>
        </Row>
        <Row>
          <div className={classes.topTrendingBox}>
            <h3 style={{ margin: '3% 0 0 5%' }}>
              <b>Suggested For You</b>
            </h3>
            <FlipMove>
              {trending.map((t) => (
                <TrendingPost
                  key={t.text}
                  title={t.title}
                  image={t.image}
                  numOfHit={t.numOfHit}
                />
              ))}
            </FlipMove>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
