import '~/scss/layouts/_header.scss';

import { Layout, Space } from 'antd';
import LoginButton from '~/components/LoginButton';
import SignUpButton from '~/components/SignUpButton';
import LogoutButton from '~/components/LogoutButton';
import { useState, useEffect } from 'react';
const { Header } = Layout;

function AppHeader() {
   const [accessToken, setAccessToken] = useState(false);
   const accessTokenFromLocalStorage = localStorage.getItem('accessToken');

   useEffect(() => {
      setAccessToken(!!accessTokenFromLocalStorage);
   }, [accessToken]);

   return (
      <Header className='header'>
         {!accessToken ? (
            <Space className='header-btn-wrapper'>
               <LoginButton />
               <SignUpButton />
            </Space>
         ) : (
            <Space className='header-btn-wrapper'>
               <LogoutButton />
            </Space>
         )}
      </Header>
   );
}

export default AppHeader;
