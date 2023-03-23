import React, { forwardRef } from 'react';
import { Avatar, Row, Col, Button, Image, Dropdown, message } from 'antd';
import {
  UserOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { removeComment } from '../utils/APIs';

const Comment = forwardRef(({ ...props }, ref) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const handleDotMenuClick = (e) => {
    if (e.key === '1' && user.username === props.comment.username) {
      removeComment({
        postId: props.postId,
        username: props.comment.username,
        text: props.comment.text,
        images: props.comment.images,
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

  return (
    <div ref={ref}>
      <Row>
        <Col xs={6} sm={3}>
          <Avatar
            style={{ margin: '2vh 0 0 40%' }}
            size={55}
            icon={<UserOutlined />}
            src={
              props.comment.avatar
                ? `http://localhost:3001/images/${props.comment.avatar}`
                : null
            }
          />
        </Col>
        <Col xs={{ span: 17, offset: 1 }} sm={20}>
          {user.username === props.comment.username && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Delete this comment',
                    icon: <DeleteOutlined />,
                  },
                ],
                onClick: handleDotMenuClick,
              }}
              trigger={['click']}
            >
              <Button
                type="link"
                shape="circle"
                size="large"
                icon={
                  <EllipsisOutlined
                    style={{ fontSize: '25px', color: 'black' }}
                  />
                }
                style={{ float: 'right', marginRight: '5%' }}
              ></Button>
            </Dropdown>
          )}

          <h3 style={{ margin: '1vh 0 0 0' }}>
            {props.comment.name}{' '}
            <span style={{ margin: '1vh 0 0 1vw', color: 'grey' }}>
              @{props.comment.username}
            </span>
          </h3>
          <p style={{ width: '95%' }}>{props.comment.text}</p>
          <Image.PreviewGroup>
            {props.comment.images.map((image) => {
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
          <span style={{ color: 'grey' }}>{props.comment.dateTime}</span>
          {props.comment.location !== 'null' && (
            <>
              <br />
              <span style={{ color: 'grey', fontSize: '11px' }}>
                {props.comment.location}
              </span>
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
});

export default Comment;
