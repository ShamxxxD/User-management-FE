import { ContainerOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const HeaderMenu = ({ user }) => {
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem(<NavLink to='/'>Home</NavLink>, '1', <PieChartOutlined />),
        getItem(<NavLink to='/messages'>Messages </NavLink>, '2', <DesktopOutlined />),
        getItem(<NavLink to={`/profile/${user._id}`}>Profile</NavLink>, '3', <ContainerOutlined />),
    ];
    return (
        <Menu
            className='header-menu'
            defaultSelectedKeys={['1']}
            mode='inline'
            theme='light'
            items={items}
            style={{ borderInlineEnd: 'none' }}
        />
    );
};
export default HeaderMenu;
