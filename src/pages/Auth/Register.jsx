import '~/scss/pages/_register.scss';
import RegisterForm from '~/components/auth/RegisterForm';
import authImage from '~/assets/images/auth-image.jpg';
import { Link } from 'react-router-dom';

import { Typography,  Row, Col} from 'antd';
const { Title } = Typography;

function Register() {
    return (
        <Row className='register-container'>
            <Col className='container-fluid'>
                <Row className='register-wrapper'>
                    <Col  xs={0} sm={0} lg={12}>
                    <img className='auth-image' src={authImage} alt='auth-form' />
                    </Col>
                    
                    <Col xs={24} sm={24} lg={12}>
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
                    </Col>
                  
                </Row>
            </Col>
        </Row>
    );
}

export default Register;
