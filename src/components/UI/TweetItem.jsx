/* eslint-disable no-unused-vars */
import '~/scss/components/_tweetItem.scss';
import { Row, Col, Space, Avatar, Typography, Image, Button, Modal, message, List, Skeleton } from 'antd';
import {
    HeartOutlined,
    CommentOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    EditOutlined,
    HeartFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { deleteRequest, postRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const { Text, Paragraph } = Typography;

function TweetItem({ post, onGetPosts }) {
    const [state, dispatch] = useStore();
    const currentId = state.user._id;
    const [initLoadingComments, setInitLoadingComments] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [likes, setLikes] = useState(post?.likes?.length);
    const [isLiked, setIsLike] = useState(() => post?.likes?.includes(currentId));
    const [comments] = useState(post?.commentCount);

    const handleLike = async () => {
        setLikes(isLiked ? likes - 1 : likes + 1);

        setIsLike(!isLiked);
        const response = await postRequest(`posts/${post._id}/like`);
        setLikes(response.data.likes);
    };
    useEffect(() => {
        setInitLoadingComments(false);
    }, []);

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
            <div className='tweet-content-wrapper'>
                <Avatar className='tweet-item-avatar' src={post?.author?.avatar} alt='avatar' size={50} />
                <Row className='tweet-item-content'>
                    <Col span={18}>
                        <Space size='small'>
                            <Link to={`/profile/${post?.author?._id}`}>{post?.author?.displayName}</Link>
                            <Text type='secondary'>@{post?.author?.username}</Text>
                            <Text type='secondary'>-</Text>
                            <Text type='secondary'>{dayjs(post?.createdAt).fromNow()}</Text>
                        </Space>
                    </Col>

                    <Col span={6}>
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
                                        This can’t be undone and it will be removed from your profile, the timeline of
                                        any accounts that follow you, and from Twitter search results.
                                    </Modal>
                                </div>
                                <div className='tweet-action-item'>
                                    <EditOutlined onClick={showEditModal} /> Edit this tweet
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
                                        This can’t be undone and it will be removed from your profile, the timeline of
                                        any accounts that follow you, and from Twitter search results.
                                    </Modal>
                                </div>
                            </div>
                        )}
                    </Col>

                    <Col span={24}>
                        <Link to={`/posts/${post?._id}`}>
                            <Row>
                                <Col span={24}>
                                    <Paragraph>{post?.content}</Paragraph>
                                </Col>
                                <Col span={24}>
                                    <Image
                                        className='tweet-item-image'
                                        width='75%'
                                        preview={false}
                                        src={post?.image}
                                        style={{
                                            aspectRatio: 2 / 3,
                                            objectFit: 'cover',
                                            borderRadius: '2rem',
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Link>
                    </Col>
                    <Col span={24} style={{ marginTop: '0.8rem' }}>
                        <Space size='large'>
                            <div className='tweet-item-icon-wrapper'>
                                <Link to={`/posts/${post?._id}`}>
                                    <CommentOutlined className='comment-icon' />
                                    <span>{comments > 0 ? `${comments} comments on this post` : comments}</span>
                                </Link>
                            </div>
                            <div className='tweet-item-icon-wrapper'>
                                {isLiked ? (
                                    <HeartFilled className='like-icon-filled' onClick={handleLike} />
                                ) : (
                                    <HeartOutlined className='like-icon' onClick={handleLike} />
                                )}
                                <span>{likes > 0 ? `${likes} people like it` : likes}</span>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </div>

            <div className='tweet-comment-wrapper' span={24}>
                <List
                    header='Comments'
                    className='demo-loadmore-list'
                    itemLayout='horizontal'
                    locale={{ emptyText: 'Be the first to comment on this post !' }}
                    loading={initLoadingComments}
                    size='large'
                    dataSource={post?.comments}
                    bordered={true}
                    renderItem={item => (
                        <List.Item>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item?.author?.avatar} />}
                                    title={<a href='https://ant.design'>{item?.author?.displayName}</a>}
                                    description={item?.comment}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />

                {Array.isArray(post?.comments) && post?.comments.length > 0 && (
                    <Button type='link'>
                        <Link to={`/posts/${post._id}`}>Load more comments ...</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default TweetItem;
