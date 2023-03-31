import '~/scss/components/_userDropdown.scss';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';

function UserDropDown() {
    const [{ user }, dispatch] = useStore();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };

            const response = await postRequest('auth/logout', {}, config);
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                dispatch(actions.setUser({}));
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const items = [
        {
            icon: <UserOutlined />,
            label: <Link to='/me'>Profile</Link>,
            key: '0',
        },
        {
            icon: <UserOutlined />,
            label: <Link to='/me/change-password'>Change password</Link>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            icon: <LogoutOutlined />,
            label: 'Log out',
            key: '2',
            onClick: () => handleLogOut(),
        },
    ];

    return (
        <Dropdown
            className='user-drop-down'
            menu={{
                items,
                selectable: true,
            }}
        >
            <Link to='#'>
                <Space>
                    <Avatar src={<img src={user?.avatar} alt='avatar' />} />
                    <span className='user-name'>{user?.displayName ?? user?.username}</span>
                    <DownOutlined />
                </Space>
            </Link>
        </Dropdown>
    );
}

export default UserDropDown;
