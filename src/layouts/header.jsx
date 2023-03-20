import '~/scss/layouts/_header.scss';
import { Layout, Space } from 'antd';
import LoginButton from '~/components/LoginButton';
import SignUpButton from '~/components/SignUpButton';
import LogoutButton from '~/components/LogoutButton';
import UserAvatar from '~/components/UserAvatar';
import jwtDecode from 'jwt-decode';
const { Header } = Layout;

function AppHeader({ isLogin }) {
    const accessToken = localStorage.getItem('accessToken');
    let userInfo;
    if (accessToken) {
        userInfo = jwtDecode(accessToken);
    }

    return (
        <Header className='header'>
            {!isLogin ? (
                <Space className='header-btn-wrapper'>
                    <LoginButton />
                    <SignUpButton />
                </Space>
            ) : (
                <Space className='header-btn-wrapper'>
                    <div>
                        {userInfo.username}
                        <UserAvatar avatar={userInfo.avatar} />
                    </div>
                    <LogoutButton />
                </Space>
            )}
        </Header>
    );
}

export default AppHeader;
