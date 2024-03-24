import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router';
import { IRouterContext } from '../types/IRouterContext';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Button, Flex, Layout, Modal } from 'antd';
import { Typography } from 'antd';
import { CSSProperties, useState } from 'react';

const { Title } = Typography;

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,
});

const titleStyle: CSSProperties = { color: 'white', margin: 0 };
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: CSSProperties = {
  minHeight: 'calc(100vh - 64px)',
  padding: '20px 48px',
};

function RootComponent() {
  const { logout, status } = Route.useRouteContext({
    select: ({ auth }) => ({
      status: auth.status,
      logout: auth.logout,
    }),
  });

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    logout();
    navigate({ to: '/', search: { page: 1 } });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Are you sure?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Layout>
        <Layout.Header style={headerStyle}>
          <Flex
            align="center"
            justify="space-between"
            style={{ height: '100%' }}
          >
            <Title level={2} style={titleStyle}>
              RSS Reader
            </Title>
            {status === 'loggedIn' ? (
              <Flex align="center" justify="space-between" gap={10}>
                <Title level={5} style={titleStyle}>
                  You are logged in as admin
                </Title>
                <Button onClick={showModal}>Logout</Button>
              </Flex>
            ) : null}
          </Flex>
        </Layout.Header>
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
      </Layout>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
