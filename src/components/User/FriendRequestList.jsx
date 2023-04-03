import { List, Avatar, Skeleton, Button } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect } from 'react';
import { getRequest, patchRequest } from '~/utils/axiosInstance';

function FriendRequestList() {
    const [{ user }, dispatch] = useStore();

    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserFriends = async () => {
            const response = await getRequest(`friends/${user?._id}/request`);
            console.log(' response:', response);
            setLoading(false);
            setFriendRequests(response.data.friends);
        };
        fetchUserFriends();
    }, []);

    const handleAcceptFriend = async item => {
        try {
            const friendId = item.user._id;
            const response = await patchRequest(`friends/${friendId}`, {
                status: 'accepted',
            });
            if (response.status === 200) {
                setFriendRequests([]);
            }

            console.log(' response:', response.data);
        } catch (error) {
            console.log('error :', error);
        }
    };

    return (
        <List
            loading={loading}
            style={{ padding: '0 1.5rem' }}
            itemLayout='horizontal'
            dataSource={friendRequests}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={() => handleAcceptFriend(item)}>
                            Accept
                        </Button>,
                        <Button danger>Remove</Button>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.user.avatar} shape='square' size={80} />}
                            title={<a href='https://ant.design'>{item.user.displayName}</a>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default FriendRequestList;
