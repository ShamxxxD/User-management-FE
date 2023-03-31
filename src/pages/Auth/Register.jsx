import '~/scss/pages/_register.scss';
import RegisterForm from '~/components/auth/RegisterForm';
import authImage from '~/assets/images/auth-image.jpg';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
const { Title } = Typography;

function Register() {
    return (
        <div className='register-container'>
            <div className='container-fluid'>
                <div className='register-wrapper'>
                    <img className='auth-image' src={authImage} alt='auth-form' />
                    <div className='register-form-wrapper'>
                        <div>
                            Hi, buddy !
                            <Title level={3} className='register-form-title'>
                                Register a new account
                            </Title>
                            <RegisterForm />
                        </div>
                        <div className='login-recommend'>
                            Do you have account ? <Link to='/auth/login'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
