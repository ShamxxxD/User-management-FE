/* eslint-disable no-unused-vars */
import '~/scss/layouts/_header.scss';
import Title from 'antd/es/typography/Title';
import logo from '~/assets/images/twitter.svg';
import { Button, Menu, Col, Row, Image, Space } from 'antd';

import {
    UserOutlined,
    HomeOutlined,
    BellOutlined,
    MailOutlined,
    CloudOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function AppHeader() {
    const [menuKey, setMenuKey] = useState();
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    };

    const items = [
        getItem(<Link to='/'>Home</Link>, '1', <HomeOutlined />),
        // getItem(<Link to='/notifications'>Notifications</Link>, '2', <BellOutlined />),
        getItem(<Link to='/messages'>Messages</Link>, '3', <MailOutlined />),
        getItem(<Link to='/profile'>Profile</Link>, '4', <UserOutlined />),
        // getItem(<Link to='/weather'>Weather</Link>, '5', <CloudOutlined />),
    ];

    return (
        <header className='header'>
            <Row gutter={[0, 20]}>
                <Col span={24}>
                    <Space size='small' align='center'>
                        <Image src={logo} alt='logo' className='logo' preview={false} width='30px' />
                        <Title className='logo-box-text' level={1} style={{ fontSize: '2rem', marginBottom: 0 }}>
                            Twitter Clone
                        </Title>
                    </Space>
                </Col>

                <Col span={24}>
                    <Menu
                        className='header-nav'
                        theme='light'
                        mode='vertical'
                        defaultSelectedKeys='1'
                        selectedKeys={menuKey}
                        items={items}
                        onClick={e => setMenuKey(e.key)}
                    />
                </Col>

                <Col span={24}>
                    <Button
                        className='sidebar-post-btn'
                        type='primary'
                        block
                        size='large'
                        shape='round'
                        icon={<ThunderboltOutlined />}
                    >
                        Tweet
                    </Button>
                </Col>
            </Row>
            {/* <NavLink to='/'>Home</NavLink>
            <NavLink to='/me'>Profile</NavLink> */}
        </header>
    );
}

export default AppHeader;
