import '~/scss/components/_conversation.scss';
import { useState, useEffect } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import Avatar from 'antd/es/avatar/avatar';
import { Row, Col, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { actions, useStore } from '~/store';

function Conversation({ conversation, currentUser, onSetCurrentChat }) {
    const [conversationUser, setConversationUser] = useState();
    const [state, dispatch] = useStore();

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser?._id);

        const getConversationUsersInfo = async () => {
            try {
                const response = await getRequest(`users/${friendId}`);
                setConversationUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        getConversationUsersInfo();
    }, [currentUser, conversation]);

    return (
        <>
            <Row
                className='conversation-item'
                onClick={() => {
                    dispatch(actions.setConversationPartner(conversationUser));
                    onSetCurrentChat(conversation._id);
                }}
            >
                <Space>
                    <Col>
                        <Avatar src={<img src={conversationUser?.avatar} alt='avatar' />} size={50} />
                    </Col>
                    <Col>
                        <Title level={4} style={{ marginBottom: 0 }} className='conversation-user-name'>
                            {conversationUser?.displayName || conversationUser?.username}
                        </Title>
                        About 2 minutes ago
                    </Col>
                </Space>
            </Row>
        </>
    );
}

export default Conversation;
