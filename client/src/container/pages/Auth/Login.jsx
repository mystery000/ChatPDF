import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../../redux/auth/authSlice';
import GuestLayout from '../../layouts/GuestLayout';

const { Title } = Typography;

function Login() {
  const loader = useSelector(state => state.auth.loader)
  const errors = useSelector(state => state.auth.errors)

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <GuestLayout>
      <Card className='w-[400px] shadow-lg'>
        <div className="text-center my-4">
          <Title level={3}>Log In</Title>
        </div>
        <Form
          name="login_form"
          className="form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              type='email'
              placeholder="Email"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button loading={loader} type="primary" htmlType="submit" className="w-full"
              size="large">Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </GuestLayout>
  );
}

export default Login;
