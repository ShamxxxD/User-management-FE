import { Row, Col, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import RightDrawler from '~/layouts/RightDrawler';
import LeftDrawler from '~/layouts/LeftDrawler';

function PageTitle({ children }) {
    return (
        <Row align='middle' style={{ height: '7rem', padding: '0rem 1.5rem', borderBottom: '1px solid #f5f5f5' }}>
            <Col  xs={{offset:1 , span:21}} sm={{offset:1 , span:17}} md={{offset:0 , span:19}}  xl={24}>
                <Title level={1} style={{ fontSize: '2.4rem', marginBottom: 0 }}>
                    {children}
                </Title>
            </Col>

            <Col xs={0} md={4} lg={4} xl={0} style={{ textAlign: 'right' }}>
                <RightDrawler />
            </Col>
        </Row>
    );
}

export default PageTitle;
