/* eslint-disable no-unused-vars */
import { Avatar } from 'antd';
import { useStore } from '~/store';

function UserAvatar() {
    const [{ user }, dispatch] = useStore();

    return <Avatar src={<img src={user?.avatar} alt='avatar' />} size={50} />;
}

export default UserAvatar;
