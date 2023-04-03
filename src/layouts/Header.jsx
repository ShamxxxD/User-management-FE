/* eslint-disable no-unused-vars */
import '~/scss/layouts/_header.scss';
import Title from 'antd/es/typography/Title';
import logo from '~/assets/images/twitter.svg';
import { Button, Col, Row, Image, Space, Avatar } from 'antd';
import HeaderMenu from '~/components/UI/Menu';
import { useStore } from '~/store';
import AccountDropDown from '~/components/UI/AccountDropDown';
import { Link, NavLink } from 'react-router-dom';

function AppHeader() {
    const [{ user }, dispatch] = useStore();

    return (
        <header className='header'>
            <Row className='header-top-container'>
                <Col span={24} className='logo-wrapper'>
                    <Link to='/'>
                        <Space size='small' align='center' wrap style={{ justifyContent: 'center' }}>
                            <Image src={logo} alt='logo' className='logo' preview={false} width='30px' />
                            <Title className='logo-box-text' level={1} style={{ fontSize: '2rem', marginBottom: 0 }}>
                                Sham Social
                            </Title>
                        </Space>
                    </Link>
                </Col>

                <Col span={24} className='menu-wrapper'>
                    <HeaderMenu user={user} />
                </Col>

                <Col span={24} className='tweet-button-wrapper'>
                    <Button className='sidebar-post-btn' type='primary' block size='large' shape='default'>
                        Tweet
                    </Button>
                </Col>
            </Row>

            <Row className='account-wrapper' align='middle'>
                <Col xs={24} sm={24} md={14} lg={24} xl={20}>
                    <Space>
                        <Avatar src={user?.avatar} size={50} />
                        <Row>
                            <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                                <h3>{user?.displayName}</h3>
                                <div>@{user?.username}</div>
                            </Col>
                        </Row>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={10} lg={24} xl={4}>
                    <AccountDropDown />
                </Col>
            </Row>
        </header>
    );
}

export default AppHeader;
