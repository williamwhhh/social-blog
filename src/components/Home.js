import { createUseStyles } from 'react-jss';
import { useState, forwardRef } from 'react';
import { Row, Col, Input, Image } from 'antd';
import Sidebar from './Sidebar';
import PostBox from './PostBox';
import Post from './Post';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '70%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
});

const Home = () => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const posts = [
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      image: 'sharkBay.jpeg',
      avatar: 'kangaroo.jpeg',
    },
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      image: 'sharkBay.jpeg',
      avatar: 'kangaroo.jpeg',
    },
    {
      displayName: 'Australia',
      username: 'Australia',
      text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
      image: 'sharkBay.jpeg',
      avatar: 'kangaroo.jpeg',
    },
  ];
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
  const TrendingPost = forwardRef(({ title, text, image, numOfHit }, ref) => {
    return (
      <div style={{ margin: '3% 0 0 5%' }}>
        <Row style={{ margin: '5% 0 5% 0' }}>
          <Col span={12}>
            <h4 style={{ margin: '1.5vh 0 0 0' }}>{title}</h4>
          </Col>
          <Col span={5}>
            <div style={{ borderRadius: '30px' }}>
              <Image width={50} src={require(`../images/${image}`)} />
            </div>
          </Col>
          <Col span={3} offset={2}>
            <h4 style={{ color: 'grey', margin: '1.5vh 0 0 0' }}>{numOfHit}</h4>
          </Col>
        </Row>
      </div>
    );
  });

  return (
    <>
      <Row>
        <Col flex={collapsed ? '80px' : '200px'} style={{ margin: '0 0 0 5%' }}>
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Col>
        <Col span={13}>
          <PostBox />
          <hr
            style={{
              border: '1px solid RGB(238,238,238)',
            }}
          ></hr>
          <FlipMove>
            {posts.map((post) => (
              <Post
                key={post.text}
                displayName={post.displayName}
                username={post.username}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
              />
            ))}
          </FlipMove>
        </Col>
        <Col flex="auto" style={{ borderLeft: 'solid RGB(238,238,238)' }}>
          <Row>
            <Input.Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              size="large"
              style={{
                width: '70%',
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
    </>
  );
};

export default Home;
