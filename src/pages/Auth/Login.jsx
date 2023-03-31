import '~/scss/pages/_register.scss';
import authImage from '~/assets/images/auth-image.jpg';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import LoginForm from '~/components/auth/LoginForm';
const { Title } = Typography;

function Login() {
    return (
        <div className='register-container'>
            <div className='container-fluid'>
                <div className='register-wrapper'>
                    <img className='auth-image' src={authImage} alt='auth-form-img' />
                    <div className='register-form-wrapper'>
                        <div>
                            Welcome back!
                            <Title level={3} className='register-form-title'>
                                Login to continue
                            </Title>
                            <LoginForm />
                        </div>
                        <div className='login-recommend'>
                            You don't have account? <Link to='/auth/register'> Sign up now </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
