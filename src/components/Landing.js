import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { createUseStyles } from 'react-jss';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import background from '../images/landingBackground.jpg';

const useStyles = createUseStyles({
  heading: {
    fontSize: '40px',
    marginTop: '30vh',
  },
  body: {
    marginTop: '3%',
    color: 'grey',
    fontSize: '20px',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexItemLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '50%',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${background})`,
  },
  flexItemRight: {
    flex: '50%',
    margin: '25vh 0 0 0',
  },
  '@media (max-width: 800px)': {
    flexContainer: {
      flexDirection: 'column',
    },
    heading: { fontSize: '30px' },
    flexItemRight: {
      margin: '3% auto',
    },
  },
  '@media (max-width: 576px)': {
    flexContainer: {
      flexDirection: 'column',
    },
    heading: { marginTop: '15vh' },
    body: {
      fontSize: '15px',
    },
    flexItemRight: {
      margin: '3% auto',
    },
  },
});

const Landing = () => {
  const classes = useStyles();

  const [visibleSignUp, setVisibleSignUp] = useState(false);

  const toggleSignUp = () => {
    setVisibleSignUp(!visibleSignUp);
  };
  console.log(visibleSignUp);

  return (
    <div>
      <Row className={classes.flexContainer}>
        <div className={classes.flexItemLeft}>
          <span className={classes.heading}>Welcome to Social Blog</span>
          <p
            className={classes.body}
            style={{ width: '80%', textAlign: 'center' }}
          >
            Social Blog helps you connect and share with the people in your
            life.
          </p>
        </div>
        <div className={classes.flexItemRight}>
          <Login onToggleSignUp={toggleSignUp} />
        </div>
        {visibleSignUp && <Register onToggleSignUp={toggleSignUp} />}
      </Row>
      <Footer></Footer>
    </div>
  );
};

export default Landing;
