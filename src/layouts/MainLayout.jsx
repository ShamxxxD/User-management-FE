import '~/scss/layouts/_main.layout.scss';

import { Layout, Space } from 'antd';
import AppHeader from './Header';
const { Content, Sider } = Layout;

function MainLayout({ children }) {
    return (
        <Layout className='container-fluid'>
            <Sider
                theme='light'
                width={300}
                style={{
                    position: 'sticky',
                    top: '0',
                    height: '100vh',
                    paddingRight: '2rem',
                }}
            >
                <AppHeader />
            </Sider>

            <Content className='main-content'>{children}</Content>
        </Layout>
    );
}

export default MainLayout;
