import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/APIs';

const useStyles = createUseStyles({
  container: {
    width: '400px',
    margin: '0 auto',
    boxShadow: '2px 2px 5px lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '25px',
    backgroundColor: '#FFF',
  },
  '@media (max-width: 576px)': {
    container: { width: '300px' },
  },
});

const Login = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    console.log(values.email);
    setLoading(true);
    login(values).then(
      (res) => {
        console.log(res);
        if (res.user) {
          setLoading(false);
          localStorage.setItem('user', JSON.stringify(res.user));
          message.success('Logged in');
          navigate('/home');
        } else {
          setLoading(false);
          message.error('Incorrect email address or password');
        }
      },
      (err) => {
        console.log(err.message);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div style={{ width: '90%', margin: 'auto' }}>
          <Form wrapperCol={{ span: 24 }} name="register" onFinish={onFinish}>
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
              <Input placeholder="Email Address" size="large" />
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
              <Input.Password placeholder="Password" size="large" />
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
                  borderRadius: '6px',
                }}
                block
                size="large"
              >
                {!loading ? <b>Log In</b> : <b>Logging In...</b>}
              </Button>
            </Form.Item>
            <hr style={{ width: '90%', border: '1px solid lightgrey' }}></hr>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                onClick={props.onToggleSignUp}
                type="primary"
                style={{
                  marginTop: '3%',
                  borderRadius: '6px',
                  backgroundColor: 'RGB(65,173,56)',
                  width: '60%',
                }}
                size="large"
              >
                <b>Sign up with email</b>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
