import { useState, useEffect } from 'react';
import { getRequest, patchRequest, deleteRequest } from '~/utils/axiosInstance';
import axiosClient from '~/utils/axiosInstance';
import { EditOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Table, Space, Modal, Input } from 'antd';

const { Column } = Table;

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [userInformation, setUserInformation] = useState('');

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUsers, setTotalUsers] = useState(1);

    const dataSource = users?.data?.users.map((user, index) => {
        let pageIndex = page === 1 ? 0 : page;
        return {
            key: index,
            order: pageIndex * 10 + (index + 1),
            id: user._id,
            role: user.role,
            username: user.username,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
        };
    });

    useEffect(() => {
        getUserPagination();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, page]);

    const getUserPagination = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await getRequest(`users/pagination?page=${page}&limit=${limit}`, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            });

            setLoading(false);
            setUsers(response);
            setTotalUsers(response.data.countTotalUsers);
        } catch (error) {
            setLoading(false);
        }
    };

    const handlePaginationChange = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    };

    const handleOpenEditModal = record => {
        setOpenEditModal(true);
        setUserInformation(record);
    };

    const handleEditUser = async () => {
        try {
            const userId = userInformation.id;
            const accessToken = localStorage.getItem('accessToken');

            await patchRequest(
                `users/${userId}`,
                { data: userInformation },
                {
                    headers: {
                        token: `Bearer ${accessToken}`,
                    },
                }
            );

            setOpenEditModal(false);
            getUserPagination();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = record => {
        const userId = record.id;
        Modal.confirm({
            title: 'Are you sure to delete this user ?',
            centered: true,
            onOk: async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    await deleteRequest(`users/${userId}`, {
                        headers: {
                            token: `Bearer ${accessToken}`,
                        },
                    });

                    getUserPagination();
                } catch (error) {
                    console.log(error);
                }
            },
        });
    };

    axiosClient.interceptors.request.use(async response => {
        return response;
    });

    return (
        <Table
            dataSource={dataSource}
            loading={loading}
            pagination={{
                pageSize: limit,
                total: totalUsers,
                onChange: (page, pageSize) => handlePaginationChange(page, pageSize),
            }}
        >
            <Column title='Order' dataIndex='order' key='order' />
            <Column
                title='Name'
                dataIndex='username'
                key='username'
                sorter={(a, b) => {
                    return a.username.length - b.username.length;
                }}
            />
            <Column
                title='Email'
                dataIndex='email'
                key='email'
                sorter={(a, b) => {
                    return a.email.length - b.email.length;
                }}
            />
            <Column title='Phone number' dataIndex='phone' key='phone' />
            <Column title='Created at' dataIndex='createdAt' key='createdAt' />

            <Column
                title='Action'
                key='action'
                render={record => (
                    <>
                        {!(record.role === 'admin') && (
                            <Space size='large'>
                                <EditOutlined onClick={() => handleOpenEditModal(record)} />
                                <DeleteOutlined
                                    onClick={() => {
                                        handleDeleteUser(record);
                                    }}
                                />

                                <Modal
                                    centered
                                    okText='Save'
                                    title='Edit user'
                                    open={openEditModal}
                                    onOk={handleEditUser}
                                    onCancel={() => setOpenEditModal(false)}
                                    maskStyle={{ background: 'rgba(0,0,0,0.03)' }}
                                >
                                    <Input
                                        value={userInformation.username}
                                        type='text'
                                        size='large'
                                        placeholder='Username'
                                        prefix={<UserOutlined />}
                                        style={{ marginBottom: '1.5rem' }}
                                        onChange={e => {
                                            setUserInformation({ ...userInformation, username: e.target.value });
                                        }}
                                    />
                                    <Input
                                        value={userInformation.email}
                                        type='email'
                                        size='large'
                                        placeholder='Email address'
                                        prefix={<MailOutlined />}
                                        style={{ marginBottom: '1.5rem' }}
                                        onChange={e => {
                                            setUserInformation({ ...userInformation, email: e.target.value });
                                        }}
                                    />
                                    <Input
                                        value={userInformation.phone}
                                        type='text'
                                        size='large'
                                        placeholder='Phone number'
                                        style={{ marginBottom: '1.5rem' }}
                                        prefix={<PhoneOutlined style={{ rotate: '90deg' }} />}
                                        onChange={e => {
                                            const phoneNumberPattern = /(\d{4})(\d{3})(\d{3})/;
                                            const phoneNumber = e.target.value
                                                .replace(/\D/g, '')
                                                .replace(phoneNumberPattern, '$1 $2 $3');
                                            setUserInformation({ ...userInformation, phone: phoneNumber });
                                        }}
                                    />
                                </Modal>
                            </Space>
                        )}
                    </>
                )}
            />
        </Table>
    );
}
export default UsersTable;
