import Search from 'antd/es/input/Search';
import Sider from 'antd/es/layout/Sider';

function RightSidebar() {
    return (
        <Sider width='100%' theme='light'>
            <Search
                style={{ borderRadius: '10rem !important' }}
                size='large'
                placeholder='Find something ...'
                allowClear
            />
        </Sider>
    );
}

export default RightSidebar;
