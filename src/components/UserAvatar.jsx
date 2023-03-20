import { Avatar } from 'antd';

function UserAvatar({ avatar }) {
    return <Avatar src={<img src={avatar} alt='avatar' />} />;
}

export default UserAvatar;
