import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({
  profileHeading: {
    margin: '2% 0 2% 5%',
  },
});

const { TabPane } = Tabs;

const onSearch = () => {};

const Notification = () => {
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

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={15} xl={13}>
        <h2 className={classes.profileHeading}>
          <b>Notification</b>
        </h2>
        <Row>
          <Tabs
            style={{ width: '100%', marginTop: '2%' }}
            defaultActiveKey="1"
            centered
            size="large"
            tabBarGutter={100}
          >
            <TabPane tab={<b>All</b>} key="1">
              <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
                From likes to reposts and a whole lot more, this <br />
                is where all the action happens.
              </h3>
            </TabPane>
            <TabPane tab={<b>Mentions</b>} key="2">
              <h3 style={{ margin: '10% 0 0 0', textAlign: 'center' }}>
                When someone mentions you, you’ll find it here.
              </h3>
            </TabPane>
          </Tabs>
        </Row>
      </Col>
      <Col
        xs={{ span: 20, offset: 3 }}
        sm={{ span: 20, offset: 3 }}
        md={{ span: 21, offset: 2 }}
        lg={{ span: 7, offset: 0 }}
        style={{ borderLeft: 'solid RGB(238,238,238)' }}
      >
        <InfoBar />
      </Col>
    </Row>
  );
};

export default Notification;
