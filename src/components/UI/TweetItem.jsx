import '~/scss/components/_tweetItem.scss';
import { Row, Col, Space, Avatar, Typography, Image, Button, Modal, message } from 'antd';
import { HeartOutlined, CommentOutlined, EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteRequest } from '~/utils/axiosInstance';
const { Text, Paragraph } = Typography;

function TweetItem({ post, onGetPosts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const showDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };
    const showEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDelete = async () => {
        console.log('delete');
        const accessToken = localStorage.getItem('accessToken');
        const response = await deleteRequest(`posts/${post._id}`, {
            headers: {
                token: accessToken,
            },
        });
        console.log(response);

        if (response.status === 200) {
            message.success('Delete tweet successfully');
            onGetPosts();
        }
        setIsDeleteModalOpen(false);
        setIsModalOpen(!isModalOpen);
    };

    const handleEdit = async () => {
        // const response = await deleteRequest('posts', {
        //     params: {
        //         id: post._id,
        //     },
        // });
        // console.log(response.data);
        // if (response.status === 200) {
        //     message.success('Delete tweet successfully');
        // }
    };

    return (
        <div className='tweet-item'>
            <Avatar
                className='tweet-item-avatar'
                src='https://firebasestorage.googleapis.com/v0/b/user-management-24176.appspot.com/o/user%20management%2Favatars%2FMe%202.jpg?alt=media&token=491bc3fd-5008-4a6a-bda4-92aba6966935'
                alt='avatar'
                size={50}
            />
            <Row className='tweet-item-content'>
                <Col span={20}>
                    <Space size='small'>
                        <Link to='/me'>{post?.author?.displayName}</Link>
                        <Text type='secondary'>@{post?.author?.username}</Text>
                        <Text type='secondary'>-</Text>
                        <Text type='secondary'>{post?.createdAt}</Text>
                    </Space>
                </Col>

                <Col span={4}>
                    <Row justify='end' align='middle'>
                        <Col>
                            <Button onClick={showModal}>
                                <EllipsisOutlined />
                            </Button>
                        </Col>
                    </Row>
                    {isModalOpen && (
                        <div className='tweet-actions-modal'>
                            <div className='tweet-action-item' onClick={showDeleteModal}>
                                <DeleteOutlined /> Delete this tweet
                                <Modal
                                    okType='danger'
                                    okButtonProps={'primary'}
                                    open={isDeleteModalOpen}
                                    onOk={handleDelete}
                                    onCancel={() => {
                                        setIsDeleteModalOpen(false);
                                    }}
                                    title='Delete tweet'
                                >
                                    This can’t be undone and it will be removed from your profile, the timeline of any
                                    accounts that follow you, and from Twitter search results.
                                </Modal>
                            </div>
                            <div className='tweet-action-item' onClick={showEditModal}>
                                <EditOutlined /> Edit this tweet
                                <Modal
                                    okText='Save'
                                    okButtonProps={'primary'}
                                    open={isEditModalOpen}
                                    onOk={handleEdit}
                                    onCancel={() => {
                                        setIsEditModalOpen(false);
                                    }}
                                    title='Edit tweet'
                                >
                                    This can’t be undone and it will be removed from your profile, the timeline of any
                                    accounts that follow you, and from Twitter search results.
                                </Modal>
                            </div>
                        </div>
                    )}
                </Col>

                <Col span={24}>
                    <Paragraph>{post.content}</Paragraph>
                </Col>
                <Col span={24}>
                    <Image
                        preview={false}
                        src={post.image}
                        style={{
                            height: '50rem',
                            aspectRatio: 2 / 3,
                            objectFit: 'cover',
                            borderRadius: '2rem',
                        }}
                    />
                </Col>
                <Col span={24} style={{ marginTop: '0.8rem' }}>
                    <Space size='large'>
                        <CommentOutlined className='comment-icon' />
                        <HeartOutlined className='like-icon' />
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default TweetItem;
