/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';

const RegisterFrom = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState(null);
    const [massage, setMassage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMassage, setShowMassage] = useState(true);
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(() => {
        const createUser = async () => {
            try {
                if (formValues) {
                    const response = await postRequest('users/register', {
                        username: formValues.username,
                        email: formValues.email,
                        password: formValues.password,
                    });
                    setLoading(false);
                    setMassage(response.data.msg);
                    setShowMassage(true);

                    if (response.data.status === true) {
                        navigate('/auth/login');
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        createUser();
    }, [formValues]);

    const handleRegister = values => {
        setLoading(true);
        setShowMassage(false);
        setDisableBtn(true);

        setTimeout(() => {
            setFormValues(values);
            setDisableBtn(false);
        }, 0);
    };

    return (
        <Form
            form={form}
            name='register'
            onFinish={handleRegister}
            size='large'
            style={{
                minWidth: 300,
                maxWidth: 500,
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
                    I have read the <Link to='#'>agreement</Link>
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' block disabled={disableBtn}>
                    Register
                </Button>
                {showMassage && massage}
            </Form.Item>
            <Spin tip='Loading...' spinning={loading} style={{ textAlign: 'center', display: 'block' }} />
        </Form>
    );
};
export default RegisterFrom;
