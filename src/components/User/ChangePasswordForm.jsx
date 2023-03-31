import { Button, Form, Input } from 'antd';
import { LockOutlined, RetweetOutlined } from '@ant-design/icons';

function ChangePasswordForm({ loading, handleSubmit }) {
    const onFinish = values => {
        handleSubmit(values);
    };

    return (
        <Form
            size='large'
            name='basic'
            requiredMark={false}
            labelAlign='left'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 1000,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete='off'
        >
            <Form.Item
                label='Current Password'
                name='currentPassword'
                rules={[
                    {
                        required: true,
                        message: 'Please input current your password!',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                label='New Password'
                name='newPassword'
                rules={[
                    {
                        required: true,
                        message: 'Please input new your password!',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                label='Re-enter Password'
                name='reEnterPassword'
                rules={[
                    {
                        required: true,
                        message: "New password don't match!",
                    },
                ]}
            >
                <Input.Password prefix={<RetweetOutlined />} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button block type='primary' htmlType='submit' loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
export default ChangePasswordForm;
