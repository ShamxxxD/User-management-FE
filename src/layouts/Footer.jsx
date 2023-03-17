import { Layout } from 'antd';
const { Footer } = Layout;

function AppHeader() {
   return (
      <footer className='footer'>
         <Layout>
            <Footer
               style={{
                  textAlign: 'center',
               }}
            >
               Ant Design ©2023 Created by Ant UED
            </Footer>
         </Layout>
      </footer>
   );
}

export default AppHeader;
