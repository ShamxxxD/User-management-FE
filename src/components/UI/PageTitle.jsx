import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import RightDrawler from '~/layouts/RightDrawler';

function PageTitle({ children }) {
    return (
        <Row align='middle' style={{ height: '7rem', padding: '0rem 1.5rem', borderBottom: '1px solid #f5f5f5' }}>
            <Col xs={20} xl={24}>
                <Title level={1} style={{ fontSize: '2.4rem', marginBottom: 0 }}>
                    {children}
                </Title>
            </Col>

            <Col xs={4} xl={0} style={{ textAlign: 'right' }}>
                <RightDrawler />
            </Col>
        </Row>
    );
}

export default PageTitle;
