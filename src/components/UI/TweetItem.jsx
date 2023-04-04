/* eslint-disable no-unused-vars */
import '~/scss/components/_tweetItem.scss';
import { Row, Col, Space, Avatar, Typography, Image, Button, message, List, Skeleton, Popconfirm } from 'antd';
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

    const showEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await deleteRequest(`posts/${post._id}`, {
            headers: {
                token: accessToken,
            },
        });

        if (response.status === 200) {
            message.success('Delete tweet successfully');
            onGetPosts();
        }
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
                <div  className='tweet-item-avatar-wrapper'>
                    <Avatar className='tweet-item-avatar' src={post?.author?.avatar} alt='avatar' size={50} />
                </div>
                <div  className='tweet-main-content-wrapper'>
                    <div className='tweet-item-content-top'>
                            <div className='tweet-item-author'>
                                <Link to={`/profile/${post?.author?._id}`}>{post?.author?.displayName}</Link>
                                <Text type='secondary'>@{post?.author?.username}</Text>
                                <Text type='secondary'>/ {dayjs(post?.createdAt).fromNow()}</Text>
                            </div>

                        {currentId === post.author._id && (
                            <div className='tweet-item-actions'>
                                <Row justify='end' align='middle'>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button onClick={showModal} size='small'>
                                            <EllipsisOutlined />
                                        </Button>
                                    </Col>
                                </Row>
                                {isModalOpen && (
                                    <div className='tweet-actions-modal'>
                                        <div className='tweet-action-item'>
                                            <Popconfirm
                                                title='Delete the tweet'
                                                description=' This can’t be undone and it will be removed from your profile, the timeline of
                                                any accounts that follow you, and from Twitter search results.'
                                                okText='Yes'
                                                onConfirm={handleDelete}
                                                cancelText='No'
                                            >
                                                <Button type='link' icon={<DeleteOutlined />}>
                                                    Delete this tweet
                                                </Button>
                                            </Popconfirm>
                                        </div>

                                        <div className='tweet-action-item'>
                                            <Popconfirm
                                                title='Edit tweet'
                                                okText='Save'
                                                onConfirm={handleDelete}
                                                cancelText='Cancel'
                                            >
                                                <Button type='link' icon={<EditOutlined />}>
                                                    Edit this tweet
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Row>
                        <Col span={24}>
                            <Link to={`/posts/${post?._id}`}>
                                <Row>
                                    <Col span={24}>
                                        <Paragraph>{post?.content}</Paragraph>
                                    </Col>
                                    {post?.image && (
                                        <Col xs={24} sm={20} md={18}>
                                            <Image
                                                className='tweet-item-image'
                                                width='100%'
                                                preview={false}
                                                src={post?.image}
                                                style={{
                                                    aspectRatio: 2 / 3,
                                                    objectFit: 'cover',
                                                    borderRadius: '2rem',
                                                }}
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </Link>
                        </Col>
                    </Row>

                    <Row className='tweet-item-icons-wrapper'>
                        <Col span={24} style={{ marginTop: '0.8rem' }}>
                            <Space size='large' align='center'>
                                <div className='tweet-item-icon'>
                                    <Link to={`/posts/${post?._id}`}>
                                        <CommentOutlined className='comment-icon' />
                                        <span>{comments > 0 ? `${comments} comments ` : comments}</span>
                                    </Link>
                                </div>
                                <div className='tweet-item-icon'>
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
            </div>

            <div className='tweet-comment-wrapper'>
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
