import { Divider, Row, Col, Input, Button, Space, message, Upload, Image, Form } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect, useState } from 'react';
import { PictureOutlined, SmileOutlined } from '@ant-design/icons';
import { storage, avatarsStorage } from '~/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { postRequest } from '~/utils/axiosInstance';

function InputNewPost({ user, onGetPosts }) {
    const [form] = Form.useForm();
    const [showEmoji, setShowEmoji] = useState(false);
    const [tweetContent, setTweetContent] = useState('');

    const [tweetImagePreview, setTweetImagePreview] = useState('');
    const [tweetImage, setTweetImage] = useState();

    const [loadingUpload] = useState(false);
    const [disableUpload] = useState(false);
    const [disableTweetButton, setDisableTweetButton] = useState(false);

    const handleChangeTweetContent = e => {
        setTweetContent(e.target.value);
        setDisableTweetButton(false);
    };

    const handleChange = file => {
        file.preview = URL.createObjectURL(file.file.originFileObj);
        setTweetImagePreview(file);
        console.log(file);
    };
    useEffect(() => {
        return () => {
            tweetImagePreview && URL.revokeObjectURL(tweetImagePreview.preview);
        };
    }, [tweetImagePreview]);

    useEffect(() => {
        if (tweetContent.length === 0) {
            setDisableTweetButton(true);
        }
    }, [tweetContent]);

    const handleSetEmoji = emoji => {
        setTweetContent(prev => prev + emoji);
    };

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
            message.error('Image must smaller than 200kb!');
            return false;
        }
    };

    const handleUpload = async info => {
        try {
            const imageRef = ref(storage, avatarsStorage + info.file.name);
            await uploadBytes(imageRef, info.file);
            const url = await getDownloadURL(imageRef);
            setTweetImage(url);
        } catch (error) {
            throw error;
        }
    };

    const uploadTweet = async () => {
        console.log('tweetImage :', tweetImage);
        const data = {
            content: tweetContent,
            author: user._id,
            video: '',
            image: tweetImage,
        };
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await postRequest('posts', data, {
                headers: {
                    token: accessToken,
                },
            });
            onGetPosts();
            setTweetContent('');
            setTweetImagePreview('');
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log('tweetImagePreview :', tweetImagePreview);
    return (
        <div>
            <Row style={{ marginBottom: '3rem' }}>
                <Col span={24}>
                    <Input.TextArea
                        value={tweetContent}
                        placeholder="What's happening?"
                        maxLength={150}
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                        showCount={true}
                        bordered={false}
                        onChange={e => handleChangeTweetContent(e)}
                    />
                </Col>
            </Row>

            {tweetImagePreview && (
                <Row>
                    <Col span={24}>
                        <Image
                            preview={false}
                            src={tweetImagePreview.preview}
                            style={{
                                width: '100%',
                                aspectRatio: 2 / 3,
                                objectFit: 'cover',
                                borderRadius: '2rem',
                            }}
                        />
                    </Col>
                </Row>
            )}

            <Divider style={{ marginBottom: '1rem' }} />
            <Row>
                <Col span={20}>
                    <Space size='middle'>
                        <Button size='middle' style={{ padding: '0.4rem .8rem' }}>
                            <SmileOutlined
                                onClick={() => {
                                    setShowEmoji(!showEmoji);
                                }}
                            />
                        </Button>

                        <Upload
                            name='image'
                            disabled={disableUpload}
                            showUploadList={false}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            customRequest={handleUpload}
                        >
                            <Button loading={loadingUpload} icon={<PictureOutlined />}></Button>
                        </Upload>
                    </Space>
                </Col>

                <Col span={4}>
                    <Button
                        disabled={disableTweetButton}
                        onClick={uploadTweet}
                        type='primary'
                        size='middle'
                        shape='round'
                    >
                        Tweet
                    </Button>
                </Col>
            </Row>
            <div style={{ position: 'absolute', zIndex: '10' }}>
                {showEmoji && (
                    <Picker
                        skin={2}
                        data={data}
                        onEmojiSelect={e => {
                            handleSetEmoji(e.native);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default InputNewPost;
