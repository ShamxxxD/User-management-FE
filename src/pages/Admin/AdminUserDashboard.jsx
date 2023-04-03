import React, { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTable from '~/components/UI/UsersTable';
import { Row, Col } from 'antd';
import AppHeader from '~/layouts/Header';

function AdminUserDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem('accessToken');
        if (!isLogin) {
            navigate('/auth/login');
        }
    });

    return (
        <Row className='container'>
            <Col
                xs={0}
                sm={0}
                md={5}
                lg={5}
                xl={5}
                style={{
                    overflow: 'auto',
                    position: 'sticky',
                    zIndex: 100,
                    top: 0,
                    bottom: 0,
                    height: '100vh',
                    padding: '1rem 2rem',
                    borderRight: '1px solid #ccc',
                }}
            >
                <AppHeader />
            </Col>

            <Col xs={24} sm={24} md={19} lg={19} xl={19} className='main-content'>
                <UsersTable />
            </Col>
        </Row>
    );
}
export default memo(AdminUserDashboard);
