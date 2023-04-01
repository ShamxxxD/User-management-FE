import { Avatar, Button, Row, Col, Space, Skeleton } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

function People({ data }) {
    return (
        <Row style={{ gap: '1rem' }}>
            <Col>
                <Avatar
                    src={data?.avatar}
                    size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }}
                />
            </Col>

            <Col>
                <Paragraph>{data?.displayName || data?.username}</Paragraph>
                <Space>
                    <Button type='primary'>Add friend</Button>
                    <Button danger type='primary'>
                        Remove
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}

export default People;
