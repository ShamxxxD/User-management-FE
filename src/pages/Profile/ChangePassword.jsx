/* eslint-disable no-unused-vars */
import '~/scss/pages/_profile.scss';
import React, { useState } from 'react';
import ChangePasswordForm from '~/components/User/ChangePasswordForm';
import LayOutNoHeader from '~/layouts/LayOutNoHeader';
import AppBreadcrumb from '~/components/UI/Breadcrumb';
import { AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu, message, Typography } from 'antd';
import UserDropDown from '~/components/User/UserDropDown';
import { patchRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';

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
        <LayOutNoHeader>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(0, 0,0, 0.2)',
                    }}
                />

                <Menu theme='dark' mode='vertical' defaultSelectedKeys={['1']} items={items} />
            </Sider>

            <div className='container'>
                <div className='breadcrumb'>
                    <AppBreadcrumb />
                    <UserDropDown />
                </div>
                <div className='content'>
                    <div className='form-container'>
                        <div className='form-wrapper'>
                            <Title level={3}>Change password</Title>
                            <ChangePasswordForm handleSubmit={handleSubmit} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </LayOutNoHeader>
    );
}

export default ChangePassword;
