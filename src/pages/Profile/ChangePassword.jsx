/* eslint-disable no-unused-vars */
import '~/scss/pages/_profile.scss';
import React, { useState } from 'react';
import ChangePasswordForm from '~/components/User/ChangePasswordForm';
import LayOutNoHeader from '~/layouts/LayOutNoHeader';
import AppBreadcrumb from '~/components/UI/Breadcrumb';
import { AppstoreOutlined } from '@ant-design/icons';
import { Layout, message, Typography, Segmented, Row, Col } from 'antd';
import { patchRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import PageTitle from '~/components/UI/PageTitle';
import MainLayout from '~/layouts/MainLayout';
import InputNewPost from '~/components/UI/InputNewPost';
import UserAvatar from '~/components/User/UserAvatar';
import TweetItem from '~/components/UI/TweetItem';
import { getRequest } from '~/utils/axiosInstance';
import RightSidebar from '~/components/UI/RightSidebar';

const { Sider } = Layout;
const { Title } = Typography;

function ChangePassword() {
    const [{ user }, dispatch] = useStore();

    const [loading, setLoading] = useState(false);

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    };

    const items = [
        getItem('User Information', '1', <AppstoreOutlined />),
        getItem('Change password', '2', <AppstoreOutlined />),
        getItem('Option 3', '3', <AppstoreOutlined />),
    ];

    const handleSubmit = async values => {
        try {
            setLoading(true);
            if (values.newPassword !== values.reEnterPassword) {
                setLoading(false);
                return message.error("New password don't match!");
            }
            const response = await patchRequest(`users/change-password/${user._id}`, {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            if (response.status === 200) {
                message.success('Change password successfully');
                setLoading(false);
                console.log(response);
            }
        } catch (error) {
            setLoading(false);
            if (error.response.status === 400) return message.error('Incorrect password !');
            if (error.response.status === 501) return message.error('Failed to update password !');
        }
    };
    return (
        <MainLayout>
            <Row>
                <Col className='content-container' span={24}>
                    <Row>
                        <Col span={24} className='heading-content'>
                            <PageTitle>Change password</PageTitle>
                        </Col>
                    </Row>
                    <Col span={24} style={{ padding: ' 1rem 5rem' }}>
                        <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
                    </Col>
                </Col>
            </Row>
        </MainLayout>
    );
}

export default ChangePassword;
