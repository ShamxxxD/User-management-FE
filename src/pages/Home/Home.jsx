/* eslint-disable no-unused-vars */
import '~/scss/pages/_home.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import { Button, Row, Col } from 'antd';
import InputNewPost from '~/components/UI/InputNewPost';
import { useStore } from '~/store';
import UserAvatar from '~/components/User/UserAvatar';
import TweetItem from '~/components/UI/TweetItem';
import { useEffect, useState } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import RightSidebar from '~/components/UI/RightSidebar';

function Home() {
    const [state, dispatch] = useStore();
    const { user } = state;

    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [disableSkip, setDisableSkip] = useState(false);

    const getPosts = async () => {
        try {
            const response = await getRequest('posts', {
                params: {
                    _skip: 0,
                    _limit: 5,
                    _userId: user._id,
                },
            });
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ]);

    const skipPost = async () => {
        let skipPost = skip + 1 
        try {
            const response = await getRequest('posts', {
                params: {
                    _skip: skipPost,
                    _limit: 5,
                    _userId: user._id,
                },
            });

            if ( response.data.posts.length < 5) {
                setDisableSkip(true)
            }
           const newPosts = posts.concat(response.data.posts)
            setSkip(skipPost)
            setPosts(newPosts);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <Row>
                <Col className='content-container' sm={24} xs={24} md={24} lg={24} xl={15}>
                    <Row>
                        <Col span={24} className='heading-content'>
                            <PageTitle>Home</PageTitle>
                        </Col>
                    </Row>
                    <Col span={24}>
                        <Row style={{ padding: '0 1.5rem', margin: '3rem 0' }}>
                            <Col span={3}>
                                <UserAvatar />
                            </Col>
                            <Col span={20}>
                                <InputNewPost user={user} onGetPosts={getPosts} />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        {Array.isArray(posts) &&
                            posts.length > 0 &&
                            posts.map(post => {
                                return <TweetItem key={post._id} post={post} onGetPosts={getPosts} />;
                            })}
                    </Col>

                    <Col span={24} style={{textAlign:'center' , margin:'1rem 0'}}>
                
                        {!disableSkip  ?   <Button type='text' onClick={() => skipPost()}>Load more posts ...</Button> : 'No more posts ...'}
                       
                    </Col>
                </Col>

                <Col className='sidebar-container' sm={0} xs={0} md={0} lg={0} xl={9}>
                    <RightSidebar />
                </Col>
            </Row>
        </MainLayout>
    );
}

export default Home;
