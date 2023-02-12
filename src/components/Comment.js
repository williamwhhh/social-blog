import React, { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Row, Col, Button, Image, Dropdown, Menu, message } from 'antd';
import {
  UserOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { removeComment } from '../utils/APIs';

const Comment = forwardRef(
  (
    {
      postId,
      name,
      username,
      text,
      images,
      avatar,
      dateTime,
      location,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const handleDotMenuClick = (e) => {
      console.log(username, text);
      if (e.key === '1' && user.username === username) {
        removeComment({
          postId: postId,
          username: username,
          text: text,
          images: images,
        }).then(
          (res) => {
            message.success(res.message);
            res.comments.reverse();
            props.updateComments(res.comments);
          },
          (err) => {
            message.error(err.message);
          }
        );
      }
    };

    const dotMenu = (
      <Menu
        onClick={handleDotMenuClick}
        items={[
          {
            label: 'Delete this comment',
            key: '1',
            icon: <DeleteOutlined />,
          },
        ]}
      />
    );
    return (
      <div ref={ref}>
        <Row>
          <Col xs={6} sm={3}>
            <Avatar
              style={{ margin: '2vh 0 0 40%' }}
              size={55}
              icon={<UserOutlined />}
              src={avatar ? `http://localhost:3001/images/${avatar}` : null}
            />
          </Col>
          <Col xs={{ span: 17, offset: 1 }} sm={20}>
            {user.username === username && (
              <Dropdown overlay={dotMenu} trigger={['click']}>
                <Button
                  type="link"
                  shape="circle"
                  size="large"
                  icon={
                    <EllipsisOutlined
                      style={{ fontSize: '25px', color: 'black' }}
                    />
                  }
                  onClick={() => {}}
                  style={{ float: 'right', marginRight: '5%' }}
                ></Button>
              </Dropdown>
            )}

            <h3 style={{ margin: '1vh 0 0 0' }}>
              {name}{' '}
              <span style={{ margin: '1vh 0 0 1vw', color: 'grey' }}>
                @{username}
              </span>
            </h3>
            <p style={{ width: '95%' }}>{text}</p>
            <Image.PreviewGroup>
              {images.map((image) => {
                return (
                  <Image
                    width={200}
                    style={{ borderRadius: '20px' }}
                    src={`http://localhost:3001/images/${image}`}
                  />
                );
              })}
            </Image.PreviewGroup>
            <br />
            <br />
            <span style={{ color: 'grey' }}>{dateTime}</span>
            {location !== 'null' && (
              <>
                <br />
                <span style={{ color: 'grey' }}>{location}</span>
              </>
            )}
          </Col>
        </Row>
        <hr
          style={{
            margin: '2vh 0 1vh 0',
            border: '1px solid RGB(238,238,238)',
          }}
        ></hr>
      </div>
    );
  }
);

export default Comment;
