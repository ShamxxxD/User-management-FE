import '~/scss/components/_loginForm.scss';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { loginRoute } from '~/utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '~/utils/axiosInstance';

const LoginForm = () => {
   const navigate = useNavigate();

   const [formValues, setFormValues] = useState('');
   const [massage, setMassage] = useState('');
   const [loading, setLoading] = useState(false);
   const [showMassage, setShowMassage] = useState(true);
   const [disableBtn, setDisableBtn] = useState(false);

   const handleLogin = values => {
      setLoading(true);
      setShowMassage(false);
      setDisableBtn(true);

      setTimeout(() => {
         setFormValues(values);
         setDisableBtn(false);
      }, 1000);
   };

   useEffect(() => {
      if (formValues) {
         const loginUser = async () => {
            try {
               const response = await postRequest(loginRoute, {
                  username: formValues.username,
                  password: formValues.password,
               });

               setLoading(false);
               setMassage(response.data.msg);
               setShowMassage(true);

               if (response.data.status === true) {
                  localStorage.setItem('accessToken', response.data.accessToken);

                  setTimeout(() => {
                     navigate('/');
                  }, 1000);
               }
            } catch (error) {
               console.log(error);
            }
         };

         loginUser();
      }
   }, [formValues]);

   return (
      <Form
         name='login'
         className='login-form'
         initialValues={{
            remember: true,
         }}
         size='large'
         style={{
            minWidth: 300,
            maxWidth: 500,
         }}
         onFinish={handleLogin}
      >
         <Form.Item
            name='username'
            rules={[
               {
                  required: true,
                  message: 'Please input your Username!',
               },
            ]}
         >
            <Input prefix={<FaUserAlt className='site-form-item-icon' />} placeholder='Username' />
         </Form.Item>

         <Form.Item
            name='password'
            rules={[
               {
                  required: true,
                  message: 'Please input your Password!',
               },
            ]}
         >
            <Input prefix={<FaLock className='site-form-item-icon' />} type='password' placeholder='Password' />
         </Form.Item>

         <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
               <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className='login-form-forgot' href=''>
               Forgot password
            </a>
         </Form.Item>

         <Form.Item>
            <Button disabled={disableBtn} block type='primary' htmlType='submit' className='login-form-button'>
               Log in
            </Button>
            {showMassage && massage}
         </Form.Item>

         <Spin tip='Loading...' spinning={loading} style={{ textAlign: 'center', display: 'block' }} />
      </Form>
   );
};
export default LoginForm;
