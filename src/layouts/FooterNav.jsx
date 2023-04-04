import '~/scss/layouts/_footer.scss';
import { Row, Col } from 'antd';

import RightDrawler from '~/layouts/RightDrawler';
import LeftDrawler from '~/layouts/LeftDrawler';
import {HomeOutlined} from '@ant-design/icons'

import { Link } from 'react-router-dom';

function FooterNav() {
    return (
        <Row className='footer'>
            <Col>
                <LeftDrawler />
            </Col>

            <Col>
                <Link to='/'><HomeOutlined /></Link>
            </Col>

            <Col>
                <RightDrawler />
            </Col>
        </Row>
    );
}

export default FooterNav;
