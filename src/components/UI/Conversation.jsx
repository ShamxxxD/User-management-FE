/* eslint-disable no-unused-vars */
import '~/scss/components/_conversation.scss';
import { useState, useEffect } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import Avatar from 'antd/es/avatar/avatar';
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
            <div
                className='conversation-item'
                onClick={() => {
                    dispatch(actions.setConversationPartner(conversationUser));
                    onSetCurrentChat(conversation._id);
                }}
            >
                {conversationUser ? (
                    <>
                        <Avatar src={<img src={conversationUser?.avatar} alt='avatar' />} size={50} />
                        <div>
                            <h3 className='conversation-user-name'>
                                {conversationUser?.displayName || conversationUser?.username}
                            </h3>
                            About 2 minutes ago 
                        </div>
                    </>
                ) : (
                    'User has been deleted'
                )}
            </div>
        </>
    );
}

export default Conversation;
