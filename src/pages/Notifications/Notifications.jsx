/* eslint-disable no-unused-vars */
import '~/scss/pages/_message.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import { Row, Col, Empty  } from 'antd';

function Notifications() {
    return (
        <MainLayout>
            <Row>
                <Col className='content-container' xs={24} sm={24} xl={24}>
                    <Row>
                        <Col span={24} className='heading-content'>
                            <PageTitle>Notifications</PageTitle>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={24} className='heading-content'>
                           <Empty description='Content is updating'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </MainLayout>
    );
}

export default Notifications;
