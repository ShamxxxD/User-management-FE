import '~/scss/components/_message.scss';
import { Row, Col, Avatar, Tooltip } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

function Message({ message, ownMessage, user }) {
    const className = ownMessage ? 'own-message' : 'message';

    return (
        <Row justify={ownMessage ? 'end' : 'start'} className='message-item'>
            <div className={className}>
                <Col order={ownMessage ? 2 : 0}>
                    <Avatar src={<img src={ownMessage ? user.avatar : user.avatar} alt='avatar' />} size={32} />
                </Col>

                <Col>
                    <Tooltip title={message.createdAt}>
                        <Paragraph className='content'>{message.text}</Paragraph>
                    </Tooltip>
                </Col>
            </div>
        </Row>
    );
}

export default Message;
