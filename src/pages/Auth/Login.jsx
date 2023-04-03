import '~/scss/pages/_register.scss';
import authImage from '~/assets/images/auth-image.jpg';
import { Link } from 'react-router-dom';

import { Typography, Row, Col } from 'antd';
import LoginForm from '~/components/auth/LoginForm';
const { Title } = Typography;

function Login() {
    return (
        <Row className='register-container'>
            <Col className='container-fluid'>
                <Row className='register-wrapper'>
                    <Col xs={0} sm={0} lg={12}>
                        <img className='auth-image' src={authImage} alt='auth-form-img' />
                    </Col>
                    <Col xs={24} sm={24} lg={12}>
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
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;
