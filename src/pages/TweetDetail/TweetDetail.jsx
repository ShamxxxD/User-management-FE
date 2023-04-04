/* eslint-disable no-unused-vars */
import '~/scss/pages/_tweetDetail.scss';
import {  EllipsisOutlined } from '@ant-design/icons';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import {
    Row,
    Col,
    Space,
    Avatar,
    Image,
    Button,
    List,
    Skeleton,
    Typography,
    Form,
    Input,
    Modal,
    Popover,
    message,
} from 'antd';
import { HeartOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deleteRequest, getRequest, patchRequest, postRequest } from '~/utils/axiosInstance';
import RightSidebar from '~/components/UI/RightSidebar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useStore } from '~/store';
const { Text, Paragraph } = Typography;
const { TextArea } = Input;

function TweetDetail() {
    const [commentForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const [state, dispatch] = useStore();
    const currentUserId = state.user._id;

    const params = useParams();
    const { id } = params;

    const [post, setPost] = useState({});
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLike] = useState(false);

    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [skipComments, setSkipComments] = useState(0);
    const [limitComments, setLimitComments] = useState(6);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [listItemValues, setListItemValues] = useState({});

    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (post?.likes?.includes(currentUserId)) {
            setLikes(post?.likes.length);
            setIsLike(true);
        }
    }, [post]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getRequest(`posts/${id}`);

            setPost(response.data.post);
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await getRequest(`comments`, {
                params: {
                    _skip: skipComments,
                    _limit: limitComments,
                    _postId: id,
                },
            });
            if (response.status === 200) {
                setTotalComments(response.data.totalCommentCount);
                setComments(response.data.comments);
            }
        };
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLike(!isLiked);

        const response = await postRequest(`posts/${post._id}/like`);
        setLikes(response.data.likes);
    };

    const loadMoreComments = async () => {
        let skip = skipComments + 1;

        const response = await getRequest('comments', {
            params: {
                _postId: id,
                _skip: skip,
                _limit: limitComments,
            },
        });
        setComments(comments.concat(response.data.comments));
        setSkipComments(skip);
    };

    const handleSendComment = async values => {
        const response = await postRequest('comments', {
            _comment: values.comment.trim(),
            _authorId: currentUserId,
            _postId: post._id,
        });
        if (response.status === 200) {
            response.data.author = { ...state.user };
            const NewComments = [response.data, ...comments];
            setComments(NewComments);
            commentForm.setFieldsValue({ comment: null });
        }
    };

    const handleEditComment = async values => {
        try {
            const response = await patchRequest(`comments/${listItemValues._id}`, {
                newComment: values.editComment,
            });

            if (response.status === 200) {
                const newComments = [...comments];
                const index = newComments.findIndex(item => item._id === listItemValues._id);
                newComments[index].comment = response.data.comment;

                setComments(newComments);
                setShowEdit(!showEdit);
            }
        } catch (error) {
            console.log('error :', error);
        }
    };

    const handleDeleteComment = async () => {
        try {
            const response = await deleteRequest(`comments/${listItemValues._id}`);
            if (response.status === 200) {
                const newComments = comments.filter(c => c._id !== listItemValues._id);
                message.success('Delete comment successfully !');
                setComments(newComments);
                setIsOpenDeleteModal(false);
            }
        } catch (error) {
            console.log('error :', error);
        }
    };

    const items = (
        <Row gutter={[0, 10]}>
            <Col span={24}>
                <Button type='primary' block onClick={() => setShowEdit(true)}>
                    Edit comment
                </Button>
            </Col>
            <Col span={24}>
                <Button danger block onClick={() => setIsOpenDeleteModal(true)}>
                    Delete comment
                </Button>

                <Modal
                    open={isOpenDeleteModal}
                    title='Delete comment'
                    zIndex='1050'
                    onOk={handleDeleteComment}
                    onCancel={() => setIsOpenDeleteModal(false)}
                >
                    Are you sure to delete this comment?
                </Modal>
            </Col>
        </Row>
    );

    editForm.setFieldsValue({
        editComment: listItemValues.comment,
    });

    return (
        <MainLayout>
            <Row>
                <Col className='content-container' sm={24} xs={24} md={24} lg={24} xl={15}>
                    <Row
                        className='heading-content'
                        style={{
                            position: 'sticky',
                            top: 0,
                            background: '#fff',
                            zIndex: 100,
                            borderBottom: '1px solid #f5f5f5',
                        }}
                    >
                        <Col span={24}>
                            <PageTitle>Tweet</PageTitle>
                        </Col>
                    </Row>

                    <Row className='tweet-content-container' style={{ padding: '1.5rem' }}>
                        <Col span={24}>
                            <Row className='tweet-author'>
                                <Col>
                                    <Space>
                                        <Avatar src={post?.author?.avatar} alt='avatar' size={50} />

                                        <Space size='small'>
                                            <Link to='/profile'>{post?.author?.displayName}</Link>
                                            <Text type='secondary'>@{post?.author?.username}</Text>
                                            <Text type='secondary'>
                                                / {dayjs(post?.createdAt).format('DD/MM/YYYY')}
                                            </Text>
                                        </Space>
                                    </Space>
                                </Col>
                            </Row>

                            <Row className='tweet-content'>
                                <Col span={24}>
                                    <Paragraph>{post?.content}</Paragraph>

                                    {post?.image && (
                                        <Image
                                            width='100%'
                                            preview={true}
                                            src={post?.image}
                                            style={{
                                                width: '100%',
                                                aspectRatio: 2 / 3,
                                                objectFit: 'cover',
                                                borderRadius: '2rem',
                                            }}
                                        />
                                    )}
                                </Col>
                            </Row>

                            <Row className='tweet-icons-wrapper'>
                                <Col span={24} style={{ marginTop: '0.8rem' }}>
                                    <Space size='large'>
                                        <div className='tweet-icon'>
                                            <Row align='middle'>
                                                <Col>
                                                    <CommentOutlined className='comment-icon' />
                                                </Col>

                                                <Col>
                                                    <span>
                                                        {totalComments > 0 ? `${totalComments} comments` : null}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='tweet-icon'>
                                            {isLiked ? (
                                                <HeartFilled className='like-icon-filled' onClick={handleLike} />
                                            ) : (
                                                <HeartOutlined className='like-icon' onClick={handleLike} />
                                            )}
                                            <span>{likes > 0 ? `${likes} people like it` : null}</span>
                                        </div>
                                    </Space>
                                </Col>
                            </Row>

                            <Row className='tweet-comments'>
                                <Col span={24}>
                                    <List
                                        header='Comments'
                                        className='demo-loadmore-list'
                                        itemLayout='horizontal'
                                        locale={{ emptyText: 'Be the first to comment on this post !' }}
                                        // loading={initLoadingComments}
                                        size='large'
                                        dataSource={comments}
                                        bordered={true}
                                        renderItem={item => (
                                            <List.Item
                                                actions={[
                                                    <Popover
                                                        placement='topRight'
                                                        content={items}
                                                        title='Title'
                                                        trigger='click'
                                                    >
                                                        <Button
                                                            onClick={() => {
                                                                setShowEdit(false);
                                                                setListItemValues(item);
                                                            }}
                                                        >
                                                            <EllipsisOutlined />
                                                        </Button>
                                                    </Popover>,
                                                ]}
                                            >
                                                <Skeleton avatar title={false} loading={item.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item?.author?.avatar} />}
                                                        title={
                                                            <Link to={`/profile/${item?.author?._id}`}>
                                                                {item?.author?.displayName || item?.author?.username}
                                                            </Link>
                                                        }
                                                        description={
                                                            item?._id === listItemValues._id && showEdit ? (
                                                                <Form onFinish={handleEditComment} form={editForm}>
                                                                    <Form.Item name='editComment'>
                                                                        <TextArea
                                                                            maxLength={500}
                                                                            autoSize={{
                                                                                minRows: 3,
                                                                                maxRows: 5,
                                                                            }}
                                                                        ></TextArea>
                                                                    </Form.Item>
                                                                    <Form.Item>
                                                                        <Button block type='primary' htmlType='submit'>
                                                                            Update
                                                                        </Button>
                                                                    </Form.Item>
                                                                </Form>
                                                            ) : (
                                                                item?.comment
                                                            )
                                                        }
                                                    />
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />

                                    {Array.isArray(comments) &&
                                        comments.length > 0 &&
                                        (comments.length >= totalComments ? (
                                            <Button type='ghost' ghost={true}>
                                                No more comments...
                                            </Button>
                                        ) : (
                                            <Button type='link' onClick={loadMoreComments}>
                                                Load more comments ...
                                            </Button>
                                        ))}

                                    <Form onFinish={handleSendComment} form={commentForm} style={{ marginTop: '1rem' }}>
                                        <Form.Item name='comment'>
                                            <TextArea
                                                showCount
                                                maxLength={500}
                                                autoSize={{
                                                    minRows: 3,
                                                    maxRows: 5,
                                                }}
                                            ></TextArea>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button block type='primary' htmlType='submit'>
                                                Send
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* End tweet-content-container */}
                </Col>
                {/* End Main content */}

                <Col className='sidebar-container' sm={0} xs={0} md={0} lg={0} xl={9}>
                    <RightSidebar />
                </Col>
            </Row>
        </MainLayout>
    );
}

export default TweetDetail;
