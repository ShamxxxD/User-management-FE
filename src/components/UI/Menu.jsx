import '~/scss/components/_menu.scss';
import { UserOutlined, HomeOutlined, MessageOutlined, BellOutlined, BookOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';

const HeaderMenu = ({ user }) => {
    return (
    

        <nav className='header-menu'>
            <NavLink className='menu-item' to='/'>
                <HomeOutlined />
                <span className='menu-item-text'>Home</span>
            </NavLink>

            <NavLink className='menu-item' to='/notifications'>
                <BellOutlined /> <span className='menu-item-text'>Notifications</span>
            </NavLink>

            <NavLink className='menu-item' to='/messages'>
                <MessageOutlined /> <span className='menu-item-text'>Messages</span>
            </NavLink>

            <NavLink className='menu-item' to='/bookmarks'>
                <BookOutlined /> <span className='menu-item-text'>Bookmarks</span>
            </NavLink>

            <NavLink className='menu-item' to={`/profile/${user._id}`}>
                <UserOutlined /> <span className='menu-item-text'>Profile</span>
            </NavLink>
        </nav>
    );
};
export default HeaderMenu;
