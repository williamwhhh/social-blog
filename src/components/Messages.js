import { createUseStyles } from 'react-jss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Button,
  Tooltip,
  Modal,
  message,
  Popconfirm,
} from 'antd';
import {
  UserOutlined,
  SendOutlined,
  SmileOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Sidebar from './Sidebar';
import Picker from 'emoji-picker-react';
import {
  deleteRoom,
  getAllUsers,
  getContacts,
  getRoomDetails,
  sendMessage,
} from '../utils/APIs';
import io from 'socket.io-client';

var socket;
const { TextArea, Search } = Input;

const useStyles = createUseStyles({
  topTrendingBox: {
    margin: '10% 0 0 10%',
    width: '70%',
    backgroundColor: 'RGB(247,249,249)',
    borderRadius: '15px',
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
  const [showDelBtn, setShowDelBtn] = useState(false);
  const confirm = () => {
    deleteRoom({
      user1: JSON.parse(localStorage.getItem('user')).username,
      user2: props.contact.username,
    }).then((res) => {
      window.location.reload(false);
      message.success('Deleted');
    });
  };

  return (
    <Row
      className={classes.contactContainer}
      style={{
        backgroundColor:
          props.contact === props.selectedContact ? 'rgb(238,238,238)' : '',
      }}
      onClick={() => {
        props.selectContact(props.contact);
      }}
      onMouseEnter={() => (props.contactsModal ? null : setShowDelBtn(true))}
      onMouseLeave={() => (props.contactsModal ? null : setShowDelBtn(false))}
    >
      <Col span={4} offset={1}>
        <Avatar
          style={{ margin: '15% 0 15% 20%' }}
          size={50}
          src={
            props.contact.avatar
              ? `http://localhost:3001/images/${props.contact.avatar}`
              : null
          }
          icon={<UserOutlined />}
        />
      </Col>
      <Col span={14} offset={1}>
        <h4 style={{ margin: '5% 0 0 5%' }}>
          {props.contact.name}
          <span style={{ margin: '0 0 0 1vw', color: 'grey' }}>
            @{props.contact.username}
          </span>
        </h4>
      </Col>
      <Col flex="auto">
        {showDelBtn && (
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={confirm}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              style={{ margin: '20%' }}
            ></Button>
          </Popconfirm>
        )}
      </Col>
    </Row>
  );
};

const ChatBox = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [roomDetails, setRoomDetails] = useState({ messages: [] });
  var user = JSON.parse(localStorage.getItem('user'));
  // socket.on('connect', () => socket.emit('room', 'room1'));
  // socket.emit('sendMessage', 'hello');

  socket.on('message', (data) => {
    setRoomDetails({
      ...roomDetails,
      messages: [...roomDetails.messages, data],
    });
  });

  useEffect(() => {
    if (props.contact) {
      getRoomDetails({
        user1: user.username,
        user2: props.contact.username,
      }).then((res) => {
        socket.emit('room', res.roomId);
        setRoomDetails(res);
      });
    }
  }, [props.contact]);

  const onFinish = () => {
    sendMessage({
      roomId: roomDetails.roomId,
      sender: user.username,
      receiver: props.contact.username,
      message: message,
    }).then((res) => {
      socket.emit('sendMessage', {
        roomId: roomDetails.roomId,
        sender: user.username,
        receiver: props.contact.username,
        message: message,
      });
      setRoomDetails({
        ...roomDetails,
        messages: [
          ...roomDetails.messages,
          {
            roomId: roomDetails.roomId,
            sender: user.username,
            receiver: props.contact.username,
            message: message,
          },
        ],
      });
    });

    setMessage('');
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message.concat(emojiObject.emoji));
  };
  return (
    <>
      {props.contact && (
        <>
          <Row
            style={{ height: '10%', borderBottom: 'solid RGB(238,238,238)' }}
          >
            <Col span={2}>
              <Avatar
                style={{ margin: '30% 0 15% 60%' }}
                size={40}
                src={
                  props.contact.avatar
                    ? `http://localhost:3001/images/${props.contact.avatar}`
                    : null
                }
                icon={<UserOutlined />}
              />
            </Col>
            <Col flex="auto" offset={1}>
              <h3 style={{ margin: '2% 0 0 5%' }}>
                {props.contact.name}
                <br />
                <span style={{ fontSize: '12px', color: 'grey' }}>
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
              overflow: 'auto',
              height: '80%',
              width: '100%',
            }}
          >
            {roomDetails.messages
              .slice()
              .reverse()
              .map((m) => (
                <div
                  style={{
                    alignSelf:
                      m.sender === user.username ? 'flex-end' : 'flex-start',
                    margin: '0 2% 2% 2%',
                    border: '0 solid',
                    borderRadius: '15px',
                    backgroundColor:
                      m.sender === user.username
                        ? 'rgb(36,144,232)'
                        : 'rgb(228,232,237)',
                    padding: '10px',
                    color: m.sender === user.username ? 'white' : 'black',
                    fontWeight: '600',
                    maxWidth: '70%',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {m.message}
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
        <Form style={{ width: '100%' }} onFinish={onFinish}>
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
  const [contacts, setContacts] = useState([]);
  const [contactsModal, setContactsModal] = useState(false);
  const [newContact, setNewContact] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  let navigate = useNavigate();
  socket = io.connect('http://localhost:8080', {
    withCredentials: true,
  });
  useEffect(() => {
    getContacts({
      username: JSON.parse(localStorage.getItem('user')).username,
    }).then((res) => {
      if (res.contacts) {
        setContacts(res.contacts);
      } else {
        message.error(res.message);
        if (res.message === 'user session expired') {
          navigate('/');
        }
      }
    });
  }, []);

  const onSearch = (value) => console.log(value);

  return (
    <Row>
      <Sidebar />
      <Col xs={20} sm={9} xl={7}>
        <h2 style={{ margin: '2vh 0 5% 5%' }}>
          <b>Messages</b>
          <Button
            style={{ float: 'right', marginRight: '5%' }}
            type="link"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setContactsModal(true);
              setNewContact(null);
              getAllUsers().then((res) => setAllUsers(res.contacts));
            }}
          ></Button>
        </h2>
        <div style={{ overflow: 'auto', maxHeight: '90vh' }}>
          {contacts.map((c) => (
            <Contact
              contact={c}
              selectedContact={currContact}
              selectContact={setCurrContact}
            />
          ))}
        </div>
        <Modal
          title="Select a contact"
          open={contactsModal}
          onOk={() => {
            setCurrContact(newContact);
            setContactsModal(false);
            setContacts([...contacts, newContact]);
          }}
          onCancel={() => setContactsModal(false)}
        >
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{
              width: '100%',
              marginBottom: '3%',
            }}
          />
          <div style={{ overflow: 'auto', maxHeight: '50vh' }}>
            {allUsers.map((c) => (
              <Contact
                contact={c}
                selectedContact={newContact}
                selectContact={setNewContact}
                contactsModal={contactsModal}
              />
            ))}
          </div>
        </Modal>
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
        <ChatBox contact={currContact} />
      </Col>
    </Row>
  );
};

export default Messages;
