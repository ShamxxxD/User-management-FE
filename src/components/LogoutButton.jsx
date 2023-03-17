import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';

function LogoutButton() {
    const handleLogOut = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await postRequest('auth/logout', {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
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
