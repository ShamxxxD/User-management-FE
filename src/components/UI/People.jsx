import { Avatar, Button, Row, Col, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { postRequest } from '~/utils/axiosInstance';

function People({ data }) {
    const handleAddFriend = async () => {
        try {
            const response = await postRequest('friends', {
                _friendId: data?._id,
            });
            console.log('response :', response);
        } catch (error) {
            console.log(' error:', error);
        }
    };

    return (
        <Row style={{ gap: '1rem' }}>
            <Col>
                <Avatar
                    src={data?.avatar}
                    size={{
                        xs: 40,
                        sm: 60,
                        md: 60,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }}
                />
            </Col>

            <Col>
                <Paragraph>{data?.displayName || data?.username}</Paragraph>
                <Space>
                    <Button type='primary' onClick={handleAddFriend}>
                        Add friend
                    </Button>
                    <Button danger type='primary'>
                        Remove
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}

export default People;
