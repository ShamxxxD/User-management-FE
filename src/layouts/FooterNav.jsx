import '~/scss/layouts/_footer.scss';
import { Row, Col } from 'antd';

import RightDrawler from '~/layouts/RightDrawler';
import LeftDrawler from '~/layouts/LeftDrawler';

function FooterNav() {
    return (
        <Row className='footer'>
            <Col>
                <LeftDrawler />
            </Col>

            <Col>
                <RightDrawler />
            </Col>
        </Row>
    );
}

export default FooterNav;
