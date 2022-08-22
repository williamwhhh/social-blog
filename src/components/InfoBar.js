import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import { Row, Input } from 'antd';
import TrendingPost from './TrendingPost';
import FlipMove from 'react-flip-move';

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '80%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
});

const onSearch = () => {};

const InfoBar = (props) => {
  const classes = useStyles();
  const [trending, setTrending] = useState([
    {
      title: '#Australia',
      image: 'sharkBay.jpeg',
      numOfHit: '2.3k',
    },
    {
      title: '#Australia1',
      image: 'sharkBay.jpeg',
      numOfHit: '2.3k',
    },
    {
      title: '#Australia2',
      image: 'sharkBay.jpeg',
      numOfHit: '2.3k',
    },
    {
      title: '#Australia3',
      image: 'sharkBay.jpeg',
      numOfHit: '2.3k',
    },
    {
      title: '#Australia4',
      image: 'sharkBay.jpeg',
      numOfHit: '2.3k',
    },
  ]);
  // const [user, setUser] = useState({
  //   name: 'Australia',
  //   username: 'Australia',
  //   following: [],
  //   followers: [],
  //   avatar: 'kangaroo.jpeg',
  //   dateOfBirth: '2022-07-06',
  //   posts: [
  //     {
  //       key: '0001',
  //       displayName: 'Australia',
  //       username: 'Australia',
  //       text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative). #seeaustralia #thisiswa #australiascoralcoast #holidayherethisyear",
  //       images: ['sharkBay.jpeg'],
  //       avatar: 'kangaroo.jpeg',
  //     },
  //     {
  //       key: '0002',
  //       displayName: 'Australia',
  //       username: 'Australia',
  //       text: "The vibrant colours of Gutharraguda (#SharkBay) are enough to brighten up any day 🧡💙 You'll find the Shark Bay World Heritage Area in the @thecoralcoast region of @WestAustralia (📷: IG/ospreycreative).",
  //       images: ['kangaroo.jpeg'],
  //       avatar: 'kangaroo.jpeg',
  //     },
  //   ],
  // });

  return (
    <>
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
                key={t.title}
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
                key={t.title}
                title={t.title}
                image={t.image}
                numOfHit={t.numOfHit}
              />
            ))}
          </FlipMove>
        </div>
      </Row>
    </>
  );
};

export default InfoBar;
