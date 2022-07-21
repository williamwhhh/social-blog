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

const Bookmarks = () => {
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
      <Col span={13}>
        <h2 className={classes.profileHeading}>
          <b>Bookmarks</b>
        </h2>
        <h1 style={{ margin: '20% 0 0 0', textAlign: 'center' }}>
          <b>Save posts for later</b>
        </h1>
        <h3 style={{ margin: '5% 0 0 0', textAlign: 'center' }}>
          Don’t let the good ones fly away! Bookmark <br />
          posts to easily find them again in the future.
        </h3>
      </Col>
      <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
        <InfoBar />
      </Col>
    </Row>
  );
};

export default Bookmarks;
