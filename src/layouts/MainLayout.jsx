import '~/scss/layouts/_main.layout.scss';
import { Row, Col } from 'antd';
import AppHeader from './Header';
import FooterNav from './FooterNav';
function MainLayout({ children }) {
    return (
        <Row className='container-fluid main-layout'>
            <Col
                xs={0}
                sm={0}
                md={5}
                lg={6}
                xl={6}
                style={{
                    overflow: 'auto',
                    position: 'sticky',
                    zIndex: 100,
                    top: 0,
                    bottom: 0,
                    height: '100vh',
                    paddingRight: '2rem',
                }}
            >
                <AppHeader />
            </Col>

            <Col xs={24} sm={24} md={19} lg={18} xl={18} className='main-content'>
                {children}
            </Col>

            <Col xs={24} sm={24} md={0}>
                <FooterNav />
            </Col>
        </Row>
    );
}

export default MainLayout;
