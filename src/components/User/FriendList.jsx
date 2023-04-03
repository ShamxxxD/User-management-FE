import { List, Avatar, Skeleton, Button } from 'antd';
import { useStore } from '~/store';
import { useState, useEffect } from 'react';
import { deleteRequest, getRequest } from '~/utils/axiosInstance';

function FriendList() {
    const [{ user }, dispatch] = useStore();

    const [friends, setFriends] = useState();
    const [loading, setLoading] = useState(true);
    const [deleteFriendId, setDeleteFriendId] = useState([]);

   

    useEffect(() => {
        const fetchUserFriends = async () => {
            const response = await getRequest(`friends/${user?._id}`);
            console.log(' response:', response.data);

            const friendList = response.data.friends.map(friend => {
                const friendUserId = friend.user._id
                if(  friendUserId ===  user?._id ){
                    return {
                        createdAt:friend.createdAt,
                       friendInfo: friend.friend
                    };
                } else {
                    return {
                        createdAt:friend.createdAt,
                        friendInfo: friend.user
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
                const newDeletedIdList = [...deleteFriendId, friendId]
                setDeleteFriendId(newDeletedIdList)
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
                <List.Item   actions={[
                    <Button type='primary'  disabled={deleteFriendId?.includes(item.friendInfo._id)?true:false} onClick={() => handleDeleteFriend(item)}>
                        {deleteFriendId?.includes(item.friendInfo._id) ? 'Deleted' : 'Delete'}
                    </Button>
                    
                ]}>
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
