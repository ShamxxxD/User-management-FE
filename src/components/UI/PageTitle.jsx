import { Row, Col, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import RightDrawler from '~/layouts/RightDrawler';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';

function PageTitle({ children }) {
    const { id } = useParams();

    const navigate = useNavigate();
    const goPreviousUrl = () => {
        navigate(-1);
    };

    return (
        <Row
            align='middle'
            style={{ height: '7rem', padding: '0rem 1.5rem', borderBottom: '1px solid #f5f5f5' }}
        >
            <Col xs={{ offset: 1, span: 21 }} sm={{ offset: 1, span: 17 }} md={{ offset: 0, span: 19 }} xl={24}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {id && <Button onClick={goPreviousUrl} icon={<ArrowLeftOutlined />}></Button>}
                    <Title level={1} style={{ fontSize: '2.4rem', marginBottom: 0 }}>
                        {children}
                    </Title>
                </div>
            </Col>

            <Col xs={0} md={4} lg={4} xl={0} style={{ textAlign: 'right' }}>
                <RightDrawler />
            </Col>
        </Row>
    );
}

export default PageTitle;
