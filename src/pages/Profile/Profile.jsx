/* eslint-disable no-unused-vars */
import '~/scss/pages/_profile.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import EditUserForm from '~/components/User/EditUserForm';
import { getRequest, patchRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';
import { CalendarOutlined } from '@ant-design/icons';
import { Image, Row, Col, Typography, Button, Modal, message, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import RightSidebar from '~/components/UI/RightSidebar';
import { useParams } from 'react-router-dom';
import UserPosts from '~/components/User/UserPosts';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FriendList from '~/components/User/FriendList';
import FriendRequestList from '~/components/User/FriendRequestList';

dayjs.extend(relativeTime);

const { Title, Paragraph } = Typography;

function Profile() {
    const params = useParams();
    const { id } = params;

    const [state, dispatch] = useStore();

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);

    const [isShowLoadMorePosts, setIsShowLoadMorePosts] = useState(true);

    const [showEditInfoForm, setShowEditInfoForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getRequest(`users/${id}`);
                setUser(response.data.user);
            } catch (error) {
                console.log(' error:', error);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        const getUserPost = async () => {
            try {
                const response = await getRequest('posts/my-posts', {
                    params: {
                        _userId: id,
                        _limit: limit,
                        _skip: skip,
                    },
                });

                if (response.data.posts.length < limit) {
                    setIsShowLoadMorePosts(false);
                }
                const newPosts = posts.concat(response.data.posts);
                setPosts(newPosts);
            } catch (error) {
                console.log(' error:', error);
            }
        };
        getUserPost();
    }, [id, limit, skip]);

    const handleFinish = async values => {
        try {
            setLoading(true);
            const response = await patchRequest(`users/${user?._id}`, values);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                dispatch(actions.setUser(response.data.user));
                message.success('Update information successfully! ');
                setLoading(false);
                setShowEditInfoForm(false);
            }
        } catch (error) {
            setLoading(false);
            setShowEditInfoForm(false);
            message.error('Update information failed!');
        }
    };
    const handleFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const items = [
        {
            key: '1',
            label: `Tweets`,
            children: <UserPosts posts={posts} isShowLoadMorePosts={isShowLoadMorePosts} setSkip={setSkip} />,
        },
        {
            key: '2',
            label: `Friends`,
            children: <FriendList />,
        },
        {
            key: '3',
            label: `Friends request`,
            children: <FriendRequestList />,
        },
    ];

    return (
        <MainLayout>
            <Row>
                <Col className='content-container' xs={24} sm={24} xl={15}>
                    <Row>
                        <Col span={24}>
                            <PageTitle>{user?.displayName || user?.username}</PageTitle>
                        </Col>

                        <Col span={24}>
                            {user?.backgroundCover && (
                                <Image
                                    style={{ minWidth: '100%', height: '20rem' }}
                                    src={user?.backgroundCover}
                                    alt=''
                                />
                            )}
                            {!user?.backgroundCover && (
                                <Col style={{ minWidth: '100%', height: '20rem', background: '#cfd9de' }}></Col>
                            )}
                        </Col>

                        <Col span={24} className='user-info-container'>
                            <Row>
                                <Col span={16}>
                                    <Image
                                        className='user-avatar'
                                        src={user?.avatar}
                                        alt='Avatar'
                                        style={{
                                            width: '14rem',
                                            height: '14rem',
                                            objectFit: 'cover',
                                            borderRadius: '10rem',
                                        }}
                                    />
                                    <Title style={{ marginBottom: 0 }} level={3}>
                                        {user?.displayName}
                                    </Title>
                                    <Paragraph italic type='secondary'>
                                        @{user?.username}
                                    </Paragraph>
                                    <Paragraph italic type='secondary'>
                                        <CalendarOutlined /> Joined {dayjs(user?.createdAt).format('DD/MM/YYYY')}
                                    </Paragraph>
                                </Col>

                                <Col span={8} style={{ marginTop: '1.5rem' }}>
                                    <Row justify='end'>
                                        <Button size='large' onClick={() => setShowEditInfoForm(true)}>
                                            Edit profile
                                        </Button>
                                        <Modal
                                            footer={false}
                                            title='Edit profile'
                                            okText='Save'
                                            open={showEditInfoForm}
                                            onCancel={() => setShowEditInfoForm(false)}
                                        >
                                            <EditUserForm
                                                user={user}
                                                loading={loading}
                                                onFinish={handleFinish}
                                                onFinishFailed={handleFinishFailed}
                                            />
                                        </Modal>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{ marginBottom: '1.5rem' }}>
                            <Tabs defaultActiveKey='1' items={items} size='large' centered />
                        </Col>
                    </Row>
                </Col>
                <Col className='sidebar-container' sm={0} xl={9}>
                    <RightSidebar />
                </Col>
            </Row>
        </MainLayout>
    );
}

export default Profile;
