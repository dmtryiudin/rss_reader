import { createFileRoute, useNavigate } from '@tanstack/react-router';
import z from 'zod';
import { Form, Button, Input, Flex, Alert } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import Title from 'antd/es/typography/Title';
import { useLoginMutation } from '../queryOptions/useLoginMutation';
import { IAuthType } from '../types/IAuthType';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin/auth')({
  component: AdminAuthRoute,
  validateSearch: z.object({
    isSessionError: z.boolean().optional(),
  }).parse,
});

function AdminAuthRoute() {
  const { isSessionError } = Route.useSearch();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isSessionError) {
      setError('Your session was expired');
    }
  }, [isSessionError]);

  const CustomFormValidationSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

  const rule = createSchemaFieldRule(CustomFormValidationSchema);

  const { login } = Route.useRouteContext({
    select: ({ auth }) => ({
      login: auth.login,
    }),
  });

  const errorCallback = (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCode = (error?.response?.data as any)?.statusCode;

    if (statusCode === 401) {
      setError('Your credentials are invalid');
    } else {
      setError('Something went wrong, try again later');
    }
  };

  const loginMutation = useLoginMutation(errorCallback);
  const navigate = useNavigate();

  const onFinish = async (data: IAuthType) => {
    const res = await loginMutation.mutateAsync(data);

    login(res);
    navigate({ to: '/admin', search: { page: 1 } });
  };

  const alertStyle = { minWidth: 600, marginBottom: 15 };

  return (
    <Flex
      style={{ height: 'calc(100vh - 64px)' }}
      align="center"
      justify="center"
      vertical
    >
      {error ? (
        <Alert
          style={alertStyle}
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ) : null}
      <Form
        name="basic"
        style={{ minWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Title level={4}>Login to admin panel</Title>
        <Form.Item label="Username" name="username" rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[rule]}>
          <Input type="password" />
        </Form.Item>
        <Flex justify="flex-end" gap={10}>
          <Form.Item>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
}
