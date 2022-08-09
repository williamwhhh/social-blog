import { createUseStyles } from 'react-jss';
import { useState, useEffect } from 'react';
import { Row, Col, Avatar, Form, Input, Button, Tooltip } from 'antd';
import { UserOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Picker from 'emoji-picker-react';

const { TextArea } = Input;

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '70%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
  },
  avatar: {
    margin: '15% 0 15% 20%',
  },
  chatBoxAvatar: {
    margin: '30% 0 15% 60%',
  },
  chatBoxName: {
    margin: '2% 0 0 5%',
  },
  chatBoxUsername: {
    fontSize: '12px',
    color: 'grey',
  },
  username: {
    margin: '0 0 0 1vw',
    color: 'grey',
  },
  displayName: {
    margin: '5% 0 0 5%',
  },
  pageHeading: {
    margin: '2% 0 5% 5%',
  },
  contactContainer: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgb(238,238,238)' },
  },
  emojiPicker: {
    position: 'absolute',
    left: '0',
    top: '-310px',
    zIndex: '1',
  },
});

const Contact = (props) => {
  const classes = useStyles();
  return (
    <Row
      className={classes.contactContainer}
      onClick={() => props.setCurrContact(props.contact)}
    >
      <Col span={4} offset={1}>
        <Avatar
          className={classes.avatar}
          size={50}
          src={require(`../images/${props.contact.avatar}`)}
          icon={<UserOutlined />}
        />
      </Col>
      <Col flex="auto">
        <h4 className={classes.displayName}>
          {props.contact.name}
          <span className={classes.username}>@{props.contact.username}</span>
        </h4>
      </Col>
    </Row>
  );
};

const ChatBox = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message.concat(emojiObject.emoji));
  };

  return (
    <>
      {props.contact != null && (
        <>
          <Row
            style={{ height: '10%', borderBottom: 'solid RGB(238,238,238)' }}
          >
            <Col span={2}>
              <Avatar
                className={classes.chatBoxAvatar}
                size={40}
                src={
                  props.contact.avatar !== '' ? (
                    require(`../images/${props.contact.avatar}`)
                  ) : (
                    <UserOutlined />
                  )
                }
                icon={<UserOutlined />}
              />
            </Col>
            <Col flex="auto" offset={1}>
              <h3 className={classes.chatBoxName}>
                {props.contact.name}
                <br />
                <span className={classes.chatBoxUsername}>
                  @{props.contact.username}
                </span>
              </h3>
            </Col>
          </Row>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              justifyContent: 'flex-start',
              overflow: 'scroll',
              height: '80%',
              width: '100%',
            }}
          >
            {props.contact.messages
              .slice()
              .reverse()
              .map((m) => (
                <div
                  style={{
                    alignSelf: m[0] === 0 ? 'flex-end' : 'flex-start',
                    margin: '0 2% 2% 2%',
                    border: '0 solid',
                    borderRadius: '15px',
                    backgroundColor:
                      m[0] === 0 ? 'rgb(36,144,232)' : 'rgb(228,232,237)',
                    padding: '10px',
                    color: m[0] === 0 ? 'white' : 'black',
                    fontWeight: '600',
                    maxWidth: '70%',
                    overflowWrap: 'break-word',
                  }}
                >
                  {m[1]}
                </div>
              ))}
          </div>
        </>
      )}
      <Row
        style={{
          position: 'absolute',
          bottom: '0',
          height: '10%',
          width: '100%',
          borderTop: 'solid RGB(238,238,238)',
        }}
      >
        <Form
          style={{ width: '100%' }}
          onFinish={() => props.sendMessage(props.contact, message)}
        >
          <Row>
            <Col span={2} offset={1}>
              <Tooltip title="Emoji">
                <Button
                  style={{ marginTop: '40%' }}
                  type="primary"
                  shape="circle"
                  icon={<SmileOutlined />}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                ></Button>
              </Tooltip>
              {showEmojiPicker && (
                <div className={classes.emojiPicker}>
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </Col>
            <Col span={17} offset={1}>
              <TextArea
                style={{ borderRadius: '25px', marginTop: '3%' }}
                autoSize={{
                  minRows: 2,
                  maxRows: 2,
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
            </Col>
            <Col span={1} offset={1}>
              <Button
                type="link"
                icon={<SendOutlined />}
                style={{ margin: '60% 0 0 0' }}
                size="large"
                htmlType="submit"
                disabled={
                  message === '' || props.contact === null ? true : false
                }
              ></Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

const Messages = () => {
  const classes = useStyles();
  const [currContact, setCurrContact] = useState(null);
  const [contacts, setContacts] = useState([
    {
      username: 'Australia',
      name: 'Australia',
      avatar: 'kangaroo.jpeg',
      messages: [],
    },
    {
      username: 'Australia1',
      name: 'Australia1',
      avatar: 'kangaroo.jpeg',
      messages: [],
    },
    {
      username: 'Australia2',
      name: 'Australia2',
      avatar: 'kangaroo.jpeg',
      messages: [],
    },
  ]);

  const sendMessage = (contact, message) => {
    contact.messages.push([0, message]);
    contact.messages.push([1, message]);
    setContacts([...contacts]);
    console.log(contacts);
  };

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={9}>
        <h2 className={classes.pageHeading}>
          <b>Messages</b>
        </h2>
        {contacts.map((c) => (
          <Contact contact={c} setCurrContact={setCurrContact} />
        ))}
      </Col>
      <Col
        xs={{ span: 20, offset: 3 }}
        sm={{ span: 12, offset: 0 }}
        style={{
          height: '100vh',
          borderLeft: 'solid RGB(238,238,238)',
          borderRight: 'solid RGB(238,238,238)',
        }}
      >
        <ChatBox contact={currContact} sendMessage={sendMessage} />
      </Col>
    </Row>
  );
};

export default Messages;
