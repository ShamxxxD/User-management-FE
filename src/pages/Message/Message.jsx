/* eslint-disable no-unused-vars */
import '~/scss/pages/_message.scss';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import { Row, Col, Divider, Button, Empty, Drawer } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect, useRef } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import Conversation from '~/components/UI/Conversation';
import ChatBox from '~/components/UI/ChatBox';
import { io } from 'socket.io-client';

function Message() {
    const [state, dispatch] = useStore();
    const { user } = state;

    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState();

    // const socket = useRef(io('ws://localhost:3001'));
    // useEffect(() => {
    //     socket.current?.emit('addUser', user._id);
    //     socket.current?.on('getUsers', users => {
    //         console.log(' users:', users);
    //     });
    // }, []);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await getRequest(`conversations/${user?._id}`);

                setConversations(response.data.conversations);
            } catch (error) {
                console.log(error);
            }
        };

        user && fetchConversations();
    }, [user, user?._id]);

    const handleSetupCurrentChat = params => {
        setCurrentChatId(params);
    };

    const fetchMessages = async () => {
        try {
            const response = await getRequest(`messages/${currentChatId}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        currentChatId && fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatId]);

    return (
        <MainLayout>
            <Row>
                <Col className='content-container' xs={24} sm={24} xl={24}>
                    <Row>
                        <Col span={24} className='heading-content'>
                            <Row align='middle' justify='space-between'>
                                <Col xs={14} lg={24} order={0}>
                                    <PageTitle>Messages</PageTitle>
                                </Col>

                                <Col xs={10} lg={0} style={{textAlign:'right'}}>
                                    <Button type='primary' onClick={showDrawer}>
                                    Conversations
                                    </Button>
                                    <Drawer title='Conversations'  width='32rem'  placement='right' onClose={onClose} open={open}>
                                        {Array.isArray(conversations) &&
                                            conversations.length > 0 &&
                                            conversations.map((c, index) => {
                                                return (
                                                    <Conversation
                                                        key={index}
                                                        currentUser={user}
                                                        conversation={c}
                                                        onSetCurrentChat={handleSetupCurrentChat}
                                                    />
                                                );
                                            })}
                                    </Drawer>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col xs={24} sm={24} lg={16}>
                                    {currentChatId ? (
                                        <ChatBox
                                            messages={messages}
                                            user={user}
                                            currentChatId={currentChatId}
                                            onFetchMessages={fetchMessages}
                                        />
                                    ) : (
                                        <Empty
                                            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span>
                                                    Choose a conversation to start message
                                                </span>
                                            }
                                        >
                                            {/* <Button type='primary'>Create Now</Button> */}
                                        </Empty>
                                    )}
                                </Col>
                                <Col xs={0} sm={0} lg={8}>
                                    {Array.isArray(conversations) &&
                                        conversations.length > 0 &&
                                        conversations.map((c, index) => {
                                            return (
                                                <Conversation
                                                    key={index}
                                                    currentUser={user}
                                                    conversation={c}
                                                    onSetCurrentChat={handleSetupCurrentChat}
                                                />
                                            );
                                        })}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </MainLayout>
    );
}

export default Message;
