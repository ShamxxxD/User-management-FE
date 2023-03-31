/* eslint-disable no-unused-vars */
import '~/scss/pages/_profile.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import EditUserForm from '~/components/User/EditUserForm';
import { getRequest, patchRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';
import { CalendarOutlined } from '@ant-design/icons';
import TweetItem from '~/components/UI/TweetItem';
import { Image, Row, Col, Typography, Button, Modal, message, Segmented } from 'antd';
import { useState, useEffect } from 'react';
import RightSidebar from '~/components/UI/RightSidebar';
const { Title, Paragraph } = Typography;

function Profile() {
    const [state, dispatch] = useStore();
    const { user } = state;
    const [posts, setPosts] = useState([]);
    const [showEditInfoForm, setShowEditInfoForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const getMyPost = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await getRequest('posts/my-posts', {
            headers: {
                token: accessToken,
            },
            params: {
                limit: 5,
            },
        });
        setPosts(response.data.posts);
    };

    useEffect(() => {
        getMyPost();
    }, []);

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
            message.success('Update information failed!');
        }
    };
    const handleFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

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
                                        {user.displayName}
                                    </Title>
                                    <Paragraph italic type='secondary'>
                                        @{user.username}
                                    </Paragraph>
                                    <Paragraph italic type='secondary'>
                                        <CalendarOutlined /> {user.createdAt}
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
                            <Segmented block options={['My posts', 'Following', 'Follower']} size='large' />
                        </Col>

                        <Row>
                            <Col span={24}>
                                {Array.isArray(posts) &&
                                    posts.length > 0 &&
                                    posts.map(post => {
                                        return <TweetItem key={post._id} post={post} />;
                                    })}
                            </Col>
                        </Row>
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
