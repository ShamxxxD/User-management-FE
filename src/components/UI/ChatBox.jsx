/* eslint-disable no-unused-vars */
import '~/scss/components/_chatbox.scss';
import { Row, Col, Avatar, Space, Form, Button, Empty } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { SendOutlined } from '@ant-design/icons';
import Message from './Message';
import { useStore } from '~/store';
import { useState, useEffect, useRef } from 'react';
import { postRequest } from '~/utils/axiosInstance';

function ChatBox({ messages, user, currentChatId, onFetchMessages }) {
    const [{ conversationPartner }, dispatch] = useStore();
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    const handleSendMessage = async e => {
        const message = {
            sender: user._id,
            text: e.message,
            conversationId: currentChatId,
        };

        try {
            const response = await postRequest('messages', message);
            onFetchMessages();
            setNewMessage(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(newMessage);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        setNewMessage('');
    }, [newMessage]);

    const initialValue = {
        message: newMessage,
    };

    console.log('conversationPartner :', conversationPartner);
    return (
        <div className='chat-box'>
            <Row style={{ background: '#f1f1f1', padding: '1rem' }}>
                <Space>
                    <Col>
                        <Avatar src={<img src={conversationPartner?.avatar} alt='avatar' />} size={50} />
                    </Col>

                    <Col>
                        <Title level={4} style={{ marginBottom: '0' }}>
                            {conversationPartner?.displayName || conversationPartner?.username}
                        </Title>
                        2 minutes ago
                    </Col>
                </Space>
            </Row>

            <Row>
                <Col span={24} style={{ marginBottom: '8rem' }} className='message-content'>
                    {Array.isArray(messages) &&
                        messages.length > 0 &&
                        messages.map(m => {
                            return (
                                <div ref={scrollRef} key={m._id}>
                                    <Message message={m} user={user} ownMessage={m.sender === user._id} />
                                </div>
                            );
                        })}

                    {Array.isArray(messages) && messages.length === 0 && (
                        <Empty description='Let send the first message' />
                    )}
                </Col>

                <Col span={24} style={{ position: 'relative' }}>
                    <Form
                        initialValues={initialValue}
                        onFinish={e => {
                            handleSendMessage(e);
                        }}
                    >
                        <div className='form-bottom'>
                            <Form.Item name='message' style={{ marginBottom: 0 }}>
                                <TextArea
                                    autoSize={{
                                        minRows: 2,
                                        maxRows: 6,
                                    }}
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button type='primary' htmlType='submit' size='large'>
                                    Send
                                    <SendOutlined />
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default ChatBox;
