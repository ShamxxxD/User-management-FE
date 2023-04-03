/* eslint-disable no-unused-vars */
import { Button, Dropdown } from 'antd';
import { EllipsisOutlined, LogoutOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';

function AccountDropDown() {
    const [state, dispatch] = useStore();
    const { user } = state;
    const isAdmin = user.role === 'admin' ? true : false;
    const navigate = useNavigate();

    const adminItems = isAdmin
        ? {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to='/admin/users'>Admin dashboard</Link>,
          }
        : '';

    const items = [
        adminItems,

        {
            icon: <LockOutlined />,
            label: <Link to={`/profile/${user._id}/change-password`}>Change password</Link>,
            key: '2',
        },
        {
            icon: <LogoutOutlined />,
            label: 'Log out',
            key: '3',
            onClick: () => handleLogOut(),
        },
    ];

    const handleLogOut = async () => {
        try {
            const response = await postRequest('auth/logout');
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                dispatch(actions.setUser({}));
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dropdown
            trigger='click'
            menu={{
                items,
            }}
            placement='topRight'
        >
            <Button block>
                <EllipsisOutlined />
            </Button>
        </Dropdown>
    );
}

export default AccountDropDown;
