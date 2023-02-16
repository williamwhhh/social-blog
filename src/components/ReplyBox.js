import {
  Avatar,
  Row,
  Col,
  Form,
  Input,
  Button,
  Upload,
  Modal,
  Tooltip,
  message,
} from 'antd';
import {
  UserOutlined,
  FileImageOutlined,
  SmileOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Picker from 'emoji-picker-react';
import { addComment } from '../utils/APIs';

const ReplyBox = (props) => {
  const [posting, setPosting] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [post, setPost] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [location, setLocation] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const onEmojiClick = (event, emojiObject) => {
    setPost(post.concat(emojiObject.emoji));
  };

  const handlePost = () => {
    setPosting(true);
    let formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('images[]', fileList[i].originFileObj);
    }
    formData.append('postId', props.postId);
    formData.append('username', user.username);
    formData.append('name', user.name);
    formData.append('text', post);
    formData.append('location', location);
    formData.append('avatar', user.avatar);
    addComment(formData).then(
      (res) => {
        if (res.comments) {
          res.comments.reverse();
          props.updateComments(res.comments);
          message.success(res.message);
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
    setPost('');
    setPosting(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation(
        'Location: ' +
          position.coords.latitude.toString() +
          ', ' +
          position.coords.longitude.toString()
      );
    });
  };

  return (
    <>
      <Row>
        <Col xs={6} sm={3}>
          <Avatar
            style={{ margin: '2vh 0 0 40%' }}
            size={55}
            icon={<UserOutlined />}
            src={
              user.avatar ? `http://localhost:3001/images/${user.avatar}` : null
            }
          />
        </Col>
        <Col xs={18} sm={{ span: 20, offset: 1 }}>
          <Form name="post" onFinish={handlePost}>
            <Form.Item
              name="text"
              style={{ margin: '3vh 0 0 0', width: '95%' }}
            >
              <Input.TextArea
                placeholder="Enter your reply"
                bordered={false}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                size="large"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
              <hr
                style={{
                  border: '1px solid RGB(238,238,238)',
                }}
              ></hr>
            </Form.Item>
            {location != null && (
              <span style={{ color: 'gray' }}>
                {location}
                <br />
              </span>
            )}
            {showUpload && (
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleUpload}
                beforeUpload={() => false}
              >
                {uploadButton}
              </Upload>
            )}
            <Modal
              open={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
            <Tooltip title="Image">
              <Button
                style={{ margin: '1.5vh 0 0 3%' }}
                type="primary"
                shape="circle"
                icon={<FileImageOutlined />}
                onClick={() => setShowUpload(!showUpload)}
              ></Button>
            </Tooltip>
            <Tooltip title="Emoji">
              <Button
                style={{ margin: '1.5vh 0 0 3%' }}
                type="primary"
                shape="circle"
                icon={<SmileOutlined />}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ></Button>
            </Tooltip>
            <Tooltip title="Location">
              <Button
                style={{ margin: '1.5vh 0 0 3%' }}
                type="primary"
                shape="circle"
                icon={<EnvironmentOutlined />}
                onClick={handleLocation}
              ></Button>
            </Tooltip>
            <Form.Item style={{ float: 'right', margin: '1vh 2vw 1vh 0' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={posting}
                size="large"
                shape="round"
                disabled={post === '' ? true : false}
              >
                {!posting ? 'Reply' : 'Replying...'}
              </Button>
            </Form.Item>
          </Form>
          {showEmojiPicker && (
            <div style={{ position: 'absolute', margin: '1%', zIndex: '1' }}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
export default ReplyBox;
