import React, { useState, useEffect } from 'react';
import { getRequest, deleteRequest } from '~/utils/axiosInstance';
import { getAllUsersRoute, deleteUserRoute } from '~/utils/APIRoutes';
import {
   AppstoreOutlined,
   BarChartOutlined,
   CloudOutlined,
   ShopOutlined,
   TeamOutlined,
   UploadOutlined,
   UserOutlined,
   VideoCameraOutlined,
   EditOutlined,
   DeleteOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Table, Space, theme, Modal } from 'antd';

const { Column } = Table;

const { Header, Content, Footer, Sider } = Layout;
const items = [
   UserOutlined,
   VideoCameraOutlined,
   UploadOutlined,
   BarChartOutlined,
   CloudOutlined,
   AppstoreOutlined,
   TeamOutlined,
   ShopOutlined,
].map((icon, index) => ({
   key: String(index + 1),
   icon: React.createElement(icon),
   label: `nav ${index + 1}`,
}));

function Home() {
   const [users, setUsers] = useState([]);

   const {
      token: { colorBgContainer },
   } = theme.useToken();

   const dataSource = users?.data?.users.map((user, index) => {
      return {
         key: index,
         order: index + 1,
         id: user._id,
         name: user.username,
         email: user.email,
         phoneNumber: user.phoneNumber,
         createdAt: user.createdAt,
      };
   });

   useEffect(() => {
      const getAllUsers = async () => {
         try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await getRequest(getAllUsersRoute, {
               headers: {
                  token: accessToken,
               },
            });
            console.log(response);
            setUsers(response);
         } catch (error) {
            console.log(error);
         }
      };

      getAllUsers();
   }, []);

   const handleDeleteUser = record => {
      const userId = record.id;
      Modal.confirm({
         title: 'Are you sure to delete this user ?',
         onOk: async () => {
            try {
               const accessToken = localStorage.getItem('accessToken');
               const response = await deleteRequest(`${deleteUserRoute}/${userId}`, {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
               });
            } catch (error) {
               console.log(error);
            }
         },
      });
   };

   return (
      <Layout hasSider>
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
                  background: 'rgba(255, 255, 255, 0.2)',
               }}
            />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} items={items} />
         </Sider>
         <Layout
            className='site-layout'
            style={{
               marginLeft: 200,
            }}
         >
            <Header
               style={{
                  padding: 0,
                  background: colorBgContainer,
               }}
            />
            <Content
               style={{
                  margin: '24px 16px 0',
                  overflow: 'initial',
               }}
            >
               <div
                  style={{
                     padding: 24,
                     textAlign: 'center',
                     background: colorBgContainer,
                  }}
               >
                  <Table dataSource={dataSource}>
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
               </div>
            </Content>
            <Footer
               style={{
                  textAlign: 'center',
               }}
            >
               Ant Design ©2023 Created by Ant UED
            </Footer>
         </Layout>
      </Layout>
   );
}
export default Home;
