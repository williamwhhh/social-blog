import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const useStyles = createUseStyles({
  outerContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
  container: {
    margin: 'auto',
    width: '80%',
    boxShadow: '2px 2px 5px lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '25px',
    backgroundColor: '#FFF',
    zIndex: '10',
    position: 'absolute',
    top: '25%',
  },
});

const Login = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPWChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <Form
            labelCol={{ offset: 2, span: 24 }}
            wrapperCol={{ offset: 2, span: 20 }}
            name="register"
            onFinish={handleCreate}
          >
            <Form.Item
              name="email"
              style={{ marginTop: '5%' }}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid email address!',
                },
                {
                  required: true,
                  message: 'Please input your email address!',
                },
              ]}
            >
              <Input
                placeholder="Email Address"
                size="large"
                onChange={onEmailChange}
                value={email}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                size="large"
                onChange={onPWChange}
                value={password}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a style={{ float: 'right' }} href="/">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  borderRadius: '6px',
                }}
                block
                size="large"
              >
                {!loading ? 'Log In' : 'Logging In...'}
              </Button>
            </Form.Item>
            <hr style={{ width: '90%', border: '1px solid lightgrey' }}></hr>
            <Form.Item>
              <Button
                onClick={props.onToggleSignUp}
                type="primary"
                style={{
                  margin: '3% 0 0 0',
                  borderRadius: '6px',
                  backgroundColor: 'RGB(65,173,56)',
                }}
                block
                size="large"
              >
                Sign up with email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
