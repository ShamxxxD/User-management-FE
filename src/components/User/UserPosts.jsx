import TweetItem from '~/components/UI/TweetItem';
import { Row, Col, Button } from 'antd';

function UserPosts({ posts, isShowLoadMorePosts, setSkip }) {
    return (
        <Row>
            <Col span={24}>
                {Array.isArray(posts) &&
                    posts.length > 0 &&
                    posts.map(post => {
                        return <TweetItem key={post._id} post={post} />;
                    })}
            </Col>

            {isShowLoadMorePosts ? (
                <Col span={24} style={{ padding: '0 1.5rem' }}>
                    <Button type='primary' block shape='round' onClick={() => setSkip(skip => skip + 1)}>
                        Show more posts...
                    </Button>
                </Col>
            ) : (
                <Col span={24} style={{ padding: '0 1.5rem', textAlign: 'center' }}>
                    No more post to show !
                </Col>
            )}
        </Row>
    );
}

export default UserPosts;
