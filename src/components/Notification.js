import { createUseStyles } from 'react-jss';
import { Row, Col, Tabs } from 'antd';
import Sidebar from './Sidebar';
import InfoBar from './InfoBar';

const useStyles = createUseStyles({
  pageHeading: {
    margin: '2% 0 2% 5%',
  },
});

const { TabPane } = Tabs;

const onSearch = () => {};

const Notification = () => {
  const classes = useStyles();

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={20} md={21} lg={14}>
        <h2 className={classes.pageHeading}>
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
        md={{ span: 21, offset: 3 }}
        lg={{ span: 7, offset: 0 }}
        style={{ borderLeft: 'solid RGB(238,238,238)' }}
      >
        <InfoBar />
      </Col>
    </Row>
  );
};

export default Notification;
