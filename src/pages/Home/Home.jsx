/* eslint-disable no-unused-vars */
import '~/scss/pages/_home.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import { Segmented, Row, Col } from 'antd';
import InputNewPost from '~/components/UI/InputNewPost';
import { useStore } from '~/store';
import UserAvatar from '~/components/User/UserAvatar';
import TweetItem from '~/components/UI/TweetItem';
import { useEffect, useState } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import RightSidebar from '~/components/UI/RightSidebar';
import Search from 'antd/es/input/Search';
import Paragraph from 'antd/es/typography/Paragraph';

function Home() {
    const [state, dispatch] = useStore();
    const { user } = state;

    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const response = await getRequest('posts');
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <MainLayout>
            <Row>
                <Col className='content-container' xs={24} sm={24} xl={15}>
                    <Row>
                        <Col span={24} className='heading-content'>
                            <PageTitle>Home</PageTitle>
                            <Segmented
                                block
                                options={['For you', 'Following']}
                                size='large'
                                style={{ margin: '1rem 0.3rem' }}
                            />
                        </Col>

                        <Col span={24}>
                            <Row style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
                                <Col span={3}>
                                    <UserAvatar />
                                </Col>
                                <Col span={20}>
                                    <InputNewPost user={user} />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            {Array.isArray(posts) &&
                                posts.length > 0 &&
                                posts.map(post => {
                                    return <TweetItem key={post._id} post={post} onGetPosts={getAllPosts} />;
                                })}
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

export default Home;
