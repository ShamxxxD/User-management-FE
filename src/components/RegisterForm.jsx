import { Button, Checkbox, Form, Input } from 'antd';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterFrom = () => {
    const [form] = Form.useForm();
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            name='register'
            onFinish={onFinish}
            size='large'
            style={{
                maxWidth: 400,
            }}
            scrollToFirstError
        >
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        min: 5,
                        message: 'Username must be larger than 5 character!',
                    },
                ]}
            >
                <Input placeholder='Username' prefix={<FaUserAlt />} />
            </Form.Item>
            <Form.Item
                name='email'
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input placeholder='Email' prefix={<FaEnvelope />} />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder='Password' prefix={<FaLock />} />
            </Form.Item>

            <Form.Item
                name='confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder='Confirm Password' prefix={<FaLock />} />
            </Form.Item>

            <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
            >
                <Checkbox>
                    I have read the <a href=''>agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
export default RegisterFrom;
