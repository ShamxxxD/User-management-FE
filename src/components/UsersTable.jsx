import { useState, useEffect } from 'react';
import { getRequest, patchRequest, deleteRequest } from '~/utils/axiosInstance';
import axiosClient from '~/utils/axiosInstance';
import { deleteUserRoute } from '~/utils/APIRoutes';
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
    const [totalPage, setTotalPage] = useState(1);

    const dataSource = users?.data?.users.map((user, index) => {
        return {
            key: index,
            order: index + 1,
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
        };
    });

    useEffect(() => {
        getUserPagination();
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
            setTotalPage(response.data.countTotalUsers);
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
                    await deleteRequest(`${deleteUserRoute}/${userId}`, {
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

    const handleChangeTable = e => {
        setPage(e.current);
        setLimit(e.pageSize);
        setTotalPage(() => totalPage / e.pageSize);
    };

    axiosClient.interceptors.request.use(async response => {
        return response;
    });

    const handleEditUser = async () => {
        try {
            const userId = userInformation.id;
            const accessToken = localStorage.getItem('accessToken');

            await patchRequest(`${deleteUserRoute}/${userId}`, {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
                data: userInformation,
            });

            setOpenEditModal(false);
            getUserPagination();
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditModal = record => {
        setOpenEditModal(true);
        setUserInformation(record);
    };

    return (
        <Table
            dataSource={dataSource}
            loading={loading}
            pagination={{ pageSize: limit, total: totalPage }}
            onChange={handleChangeTable}
        >
            <Column title='Order' dataIndex='order' key='order' />
            <Column title='Name' dataIndex='username' key='username' sorter />
            <Column title='Email' dataIndex='email' key='email' />
            <Column title='Phone number' dataIndex='phone' key='phone' />
            <Column title='Created at' dataIndex='createdAt' key='createdAt' />

            <Column
                title='Action'
                key='action'
                render={record => (
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
                                    setUserInformation({ ...userInformation, phone: e.target.value });
                                }}
                            />
                        </Modal>
                    </Space>
                )}
            />
        </Table>
    );
}
export default UsersTable;
