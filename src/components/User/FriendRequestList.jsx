import { List, Avatar, Skeleton, Button } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect } from 'react';
import { getRequest, patchRequest } from '~/utils/axiosInstance';

function FriendRequestList() {
    const [{ user }, dispatch] = useStore();

    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptedId, setAcceptedId] = useState([]);
    const [rejectedId, setRejectedId] = useState([]);

    useEffect(() => {
        const fetchFriendsRequest = async () => {
            const response = await getRequest(`friends/${user?._id}/request`);
            setLoading(false);
            setFriendRequests(response.data.friends);
        };
        fetchFriendsRequest();
    }, []);

    const handleAcceptFriend = async item => {
        try {
            const friendId = item.user._id;
            const response = await patchRequest(`friends/${friendId}`, {
                status: 'accepted',
            });
            if (response.status === 200) {
                const newAcceptedId = [...acceptedId, friendId];
                setAcceptedId(newAcceptedId);
            }
        } catch (error) {
            console.log('error :', error);
        }
    };

    const handleRejectFriend = async item => {
        try {
            const rejectId = item.user._id;
            const response = await patchRequest(`friends/${rejectId}`, {
                status: 'rejected',
            });
            if (response.status === 200) {
                const newRejectedId = [...rejectedId, rejectId];
                setRejectedId(newRejectedId);
            }
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
                         (
                            <Button
                                type='primary'
                                disabled={(acceptedId.length > 0  && acceptedId?.includes(item.user._id))|| (rejectedId.length>0 && rejectedId?.includes(item.user._id) )? true : false}
                                onClick={() => handleAcceptFriend(item)}
                            >
                                {(acceptedId.length > 0  && acceptedId?.includes(item.user._id)) ? 'Accepted' : 'Accept'}
                            </Button>
                        ),

                         (
                            <Button
                                danger
                                disabled={(acceptedId.length > 0  && acceptedId?.includes(item.user._id))|| (rejectedId.length>0 && rejectedId?.includes(item.user._id) )? true : false}
                                onClick={() => handleRejectFriend(item)}
                            >
                                { (rejectedId.length>0 && rejectedId?.includes(item.user._id)) ? 'Removed' : 'Remove'}
                            </Button>
                        ),
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
