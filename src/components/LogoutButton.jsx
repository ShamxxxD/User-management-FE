import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';

function LogoutButton() {
    const navigate = useNavigate();

    const [state, dispatch] = useStore();

    const handleLogOut = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            };
            const data = {
                key1: 'value1',
                key2: 'value2',
            };
            const response = await postRequest('auth/logout', data, config);
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                dispatch(actions.isUserLogin(false));
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button>
            <Link onClick={handleLogOut} to='/'>
                Log out
            </Link>
        </Button>
    );
}

export default LogoutButton;
