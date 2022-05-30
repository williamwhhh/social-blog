import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { createUseStyles } from 'react-jss';
import Login from './Login';
import Register from './Register';

const useStyles = createUseStyles({
  backgroundContainer: {
    width: '100%',
    height: '100vh',
  },
  heading: {
    fontSize: '25pt',
    textAlign: 'center',
  },
  body: {
    marginTop: '3%',
    color: 'grey',
    fontSize: '12pt',
  },
});

const Landing = () => {
  const styles = useStyles();

  const [visibleSignUp, setVisibleSignUp] = useState(false);

  const toggleSignUp = () => {
    setVisibleSignUp(!visibleSignUp);
  };
  console.log(visibleSignUp);

  return (
    <div>
      <Row>
        <Col span={12}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '35vh',
            }}
          >
            <span className={styles.heading}>Welcome to Social Blog</span>
            <p
              className={styles.body}
              style={{ width: '80%', textAlign: 'center' }}
            >
              Social Blog helps you connect and share with the people in your
              life.
            </p>
          </div>
        </Col>
        <Col span={12}>
          <Login onToggleSignUp={toggleSignUp} />
        </Col>
        {visibleSignUp && <Register onToggleSignUp={toggleSignUp} />}
      </Row>
    </div>
  );
};

export default Landing;
