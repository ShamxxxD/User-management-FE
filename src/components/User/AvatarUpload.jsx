import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import { storage, avatarsStorage } from '~/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { patchRequest } from '~/utils/axiosInstance';
import { useStore } from '~/store';
import { actions } from '~/store';

const AvatarUpload = () => {
    const [{ user }, dispatch] = useStore();
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar);

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
            message.error('Image must smaller than 200kb!');
            return false;
        }
    };

    const handleUpload = async info => {
        try {
            setLoading(true);
            setAvatarUrl(null);

            const imageRef = ref(storage, avatarsStorage + info.file.name);
            await uploadBytes(imageRef, info.file);
            const url = await getDownloadURL(imageRef);

            setLoading(false);
            setAvatarUrl(url);

            const response = await patchRequest(`users/${user._id}`, { avatar: url });
            if (response.status === 200) {
                message.success('Avatar has been updated successfully');
                localStorage.setItem('accessToken', response.data.accessToken);
                dispatch(actions.setUser(response.data.user));
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload
                name='avatar'
                listType='picture-circle'
                className='avatar-uploader'
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={handleUpload}
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt='avatar'
                        style={{
                            borderRadius: '10rem',
                            width: '10rem',
                            height: '10rem',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </>
    );
};
export default AvatarUpload;
