import { List, Avatar, Skeleton, Button } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect } from 'react';
import { getRequest } from '~/utils/axiosInstance';

function FriendList() {
    const [{ user }, dispatch] = useStore();

    const [friends, setFriends] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserFriends = async () => {
            const response = await getRequest(`friends/${user?._id}`);
            console.log(' response:', response);
            setLoading(false);
            setFriends(response.data.friends);
        };
        fetchUserFriends();
    }, []);

    return (
        <List
            loading={loading}
            style={{ padding: '0 1.5rem' }}
            itemLayout='horizontal'
            dataSource={friends}
            renderItem={(item, index) => (
                <List.Item>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.friend.avatar} shape='square' size={80} />}
                            title={<a href='https://ant.design'>{item.friend.displayName}</a>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default FriendList;
