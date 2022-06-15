import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Row, Col, Form, Input, Button, DatePicker, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const useStyles = createUseStyles({
  blurContainer: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
  },
  outerContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    position: 'absolute',
  },
  container: {
    margin: 'auto',
    width: '80%',
    boxShadow: '2px 2px 5px lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '25px',
    backgroundColor: '#FFF',
    zIndex: '15',
  },
  closeBtn: {
    boxShadow: '2px 2px 5px lightgrey',
    border: '2px solid lightgrey',
    position: 'absolute',
    right: '12%',
  },
});

const Register = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async () => {
    setLoading(true);
  };

  const onFNChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLNChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPWChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={`${classes.blurContainer} blur`}></div>
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="register"
            onFinish={handleCreate}
          >
            <Button
              className={classes.closeBtn}
              icon={<CloseOutlined />}
              onClick={props.onToggleSignUp}
              shape="circle"
              data-testid="register-modal-close-btn"
            />
            <h1 style={{ textAlign: 'center', marginTop: '2%' }}>
              <b>Sign Up</b>
            </h1>
            <Row>
              <Col span={9} offset={2}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="First Name"
                    onChange={onFNChange}
                    value={firstName}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email Address"
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
                    autoComplete="off"
                    placeholder="Email Address"
                    onChange={onEmailChange}
                    value={email}
                  />
                </Form.Item>
                <Form.Item label="Date of Birth">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={9} offset={2}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your full name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    autoComplete="off"
                    placeholder="Last Name"
                    onChange={onLNChange}
                    value={lastName}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'Password requires minimum 6 characters',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    autoComplete="off"
                    className={classes.inputSize}
                    placeholder="Password"
                    onChange={onPWChange}
                    value={password}
                  />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                  <Select placeholder="select your gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{
                  display: 'block',
                  margin: '2% auto 2% auto',
                  width: '40%',
                  borderRadius: '6px',
                  backgroundColor: 'RGB(65,173,56)',
                }}
              >
                {!loading ? <b>Sign Up</b> : <b>Signing Up</b>}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
