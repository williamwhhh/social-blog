import { createUseStyles } from 'react-jss';
import { Avatar, Row, Col, Form, Input, Button, Upload, Modal } from 'antd';
import {
  UserOutlined,
  FileImageOutlined,
  SmileOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const useStyles = createUseStyles({
  avatar: {
    margin: '2vh 0 0 40%',
  },
  postInput: {
    margin: '3vh 0 0 0',
    width: '95%',
  },
  postButton: {
    float: 'right',
    margin: '1vh 2vw 1vh 0',
  },
  imageButton: {
    margin: '1.5vh 0 0 3%',
  },
  emojiButton: {
    margin: '1.5vh 0 0 3%',
  },
  locationButton: {
    margin: '1.5vh 0 0 3%',
  },
});

const PostBox = (props) => {
  const classes = useStyles();
  const [posting, setPosting] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [post, setPost] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handlePost = () => {
    // setPosting(true);
    // console.log(post);
    props.addPost({
      displayName: 'Australia',
      username: 'Australia',
      text: post,
      images: ['kangaroo.jpeg', 'sharkBay.jpeg'],
      avatar: 'kangaroo.jpeg',
    });
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
  return (
    <>
      <Row>
        <h2 style={{ margin: '2% 0 0 5%' }}>Home</h2>
      </Row>
      <Row>
        <Col span={4}>
          <Avatar
            className={classes.avatar}
            size={50}
            icon={<UserOutlined />}
          />
        </Col>
        <Col span={20}>
          <Form name="register" onFinish={handlePost}>
            <Form.Item name="post" className={classes.postInput}>
              <Input.TextArea
                placeholder="What's happening?"
                bordered={false}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                size="large"
                onChange={(e) => setPost(e.target.value)}
              />
              <hr
                style={{
                  border: '1px solid RGB(238,238,238)',
                }}
              ></hr>
            </Form.Item>
            {showUpload && (
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleUpload}
              >
                {uploadButton}
              </Upload>
            )}
            <Modal
              visible={previewVisible}
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
            <Button
              className={classes.imageButton}
              type="primary"
              shape="circle"
              icon={<FileImageOutlined />}
              onClick={() => setShowUpload(!showUpload)}
            ></Button>
            <Button
              className={classes.emojiButton}
              type="primary"
              shape="circle"
              icon={<SmileOutlined />}
            ></Button>
            <Button
              className={classes.locationButton}
              type="primary"
              shape="circle"
              icon={<EnvironmentOutlined />}
            ></Button>
            <Form.Item className={classes.postButton}>
              <Button
                type="primary"
                htmlType="submit"
                loading={posting}
                size="large"
                shape="round"
                disabled={post === '' ? true : false}
              >
                {!posting ? 'Post' : 'Posting...'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default PostBox;
