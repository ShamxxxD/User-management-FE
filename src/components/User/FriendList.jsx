import { List, Avatar, Skeleton, Button } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect } from 'react';
import { deleteRequest, getRequest, postRequest } from '~/utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { patchRequest } from '~/utils/axiosInstance';

function FriendList() {
    const [{ user }, dispatch] = useStore();
    const { id } = useParams();

    const isOwn = user._id === id ? true : false;

    console.log(' isOwn:', isOwn);

    const [friends, setFriends] = useState();
    const [loading, setLoading] = useState(true);
    const [deleteFriendId, setDeleteFriendId] = useState([]);
    const [friendIds, setFriendIds] = useState([]);

    useEffect(() => {
        const fetchUserFriends = async () => {
            const response = await getRequest(`friends/${id}`);

            const friendList = response.data.friends.map(friend => {
                const friendUserId = friend.user._id;
                if (friendUserId === id) {
                    return {
                        createdAt: friend.createdAt,
                        friendInfo: friend.friend,
                    };
                } else {
                    return {
                        createdAt: friend.createdAt,
                        friendInfo: friend.user,
                    };
                }
            });
            setLoading(false);
            setFriends(friendList);
        };
        fetchUserFriends();
    }, []);

    const handleDeleteFriend = async item => {
        try {
            const friendId = item.friendInfo._id;
            const response = await deleteRequest(`friends/${friendId}`);
            if (response.status === 200) {
                const newDeletedIdList = [...deleteFriendId, friendId];
                setDeleteFriendId(newDeletedIdList);
            }
        } catch (error) {
            console.log('error :', error);
        }
    };

    const handleRequestFriend = async item => {
        try {

            console.log(' item:',item );
            const friendId = item.friendInfo._id;
            const response = await postRequest('friends', {
                _friendId: friendId
            });
            console.log('response :', response);
            if (response.status === 200) {
                const newRequestId = [...friendIds, friendId];
                setFriendIds(newRequestId);
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
            dataSource={friends}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        isOwn ? (
                            <Button
                                type='primary'
                                disabled={
                                    deleteFriendId.length > 0 && deleteFriendId?.includes(item.friendInfo._id)
                                        ? true
                                        : false
                                }
                                onClick={() => handleDeleteFriend(item)}
                            >
                                {deleteFriendId.length > 0 && deleteFriendId?.includes(item.friendInfo._id)
                                    ? 'Deleted'
                                    : 'Delete'}
                            </Button>
                        ) : (
                            <Button
                                type='primary'
                                disabled={friendIds.length > 0 && friendIds?.includes(item.friendInfo._id) ? true : false}
                                onClick={() => handleRequestFriend(item)}
                            >
                                {(friendIds.length > 0) && friendIds?.includes(item.friendInfo._id) ? 'Requested' : 'Add friend'}
                            </Button>
                        ),
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.friendInfo.avatar} shape='square' size={80} />}
                            title={<a href='https://ant.design'>{item.friendInfo.displayName}</a>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default FriendList;
