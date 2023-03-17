import { useState, useEffect } from 'react';
import { getRequest, deleteRequest } from '~/utils/axiosInstance';
import { deleteUserRoute } from '~/utils/APIRoutes';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Table, Space, Modal } from 'antd';

const { Column } = Table;

function UsersTable() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [totalPage, setTotalPage] = useState(1);

   const dataSource = users?.data?.users.map((user, index) => {
      return {
         key: index,
         order: index + 1,
         id: user._id,
         name: user.username,
         email: user.email,
         phoneNumber: user.phone,
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

   const handleChange = e => {
      setPage(e.current);
      setLimit(e.pageSize);
      setTotalPage(() => totalPage / e.pageSize);
   };
   return (
      <Table
         dataSource={dataSource}
         loading={loading}
         pagination={{ pageSize: limit, total: totalPage }}
         onChange={handleChange}
      >
         <Column title='Order' dataIndex='order' key='order' />
         <Column title='Name' dataIndex='name' key='name' sorter />
         <Column title='Email' dataIndex='email' key='email' />
         <Column title='Phone number' dataIndex='phoneNumber' key='phoneNumber' />
         <Column title='Created at' dataIndex='createdAt' key='createdAt' />

         <Column
            title='Action'
            key='action'
            render={record => (
               <Space size='large'>
                  <EditOutlined />
                  <DeleteOutlined
                     onClick={() => {
                        handleDeleteUser(record);
                     }}
                  />
               </Space>
            )}
         />
      </Table>
   );
}
export default UsersTable;
