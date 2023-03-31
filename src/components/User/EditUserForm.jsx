import AvatarUpload from '~/components/User/AvatarUpload';
import { Button, Form, Input } from 'antd';

function EditUserForm({ user, onFinish, onFinishFailed, loading }) {
    return (
        <Form
            name='basic'
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 18,
            }}
            requiredMark={false}
            labelAlign='left'
            size='large'
            style={{
                maxWidth: 800,
            }}
            initialValues={user}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item label='Username' name='username'>
                <Input disabled />
            </Form.Item>

            <Form.Item
                label='Display name'
                name='displayName'
                rules={[
                    {
                        required: true,
                        message: 'Please input your display name!',
                    },
                ]}
            >
                <Input placeholder='Enter your name' />
            </Form.Item>

            <Form.Item label='Phone number' name='phone'>
                <Input />
            </Form.Item>

            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input type='email' />
            </Form.Item>

            <Form.Item label='Avatar'>
                <AvatarUpload /> Chỉ JPG, GIF hoặc PNG lớn nhất là 10MB
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 12,
                }}
            >
                <Button block type='primary' htmlType='submit' loading={loading}>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}
export default EditUserForm;
