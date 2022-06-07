import { forwardRef } from 'react';
import { Row, Col, Image } from 'antd';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  trendingPost: {
    margin: '3% 0 0 0',
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgb(238,238,238)' },
  },
});

const TrendingPost = forwardRef(({ title, text, image, numOfHit }, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.trendingPost}>
      <Row style={{ margin: '5% 0 5% 0' }}>
        <Col span={13}>
          <h4 style={{ margin: '1.5vh 0 0 10%' }}>{title}</h4>
        </Col>
        <Col span={4}>
          <div style={{ borderRadius: '30px' }}>
            <Image width={50} src={require(`../images/${image}`)} />
          </div>
        </Col>
        <Col span={3} offset={3}>
          <h4 style={{ color: 'grey', margin: '1.5vh 0 0 0' }}>{numOfHit}</h4>
        </Col>
      </Row>
    </div>
  );
});

export default TrendingPost;
