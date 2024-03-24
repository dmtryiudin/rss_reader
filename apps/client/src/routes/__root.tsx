import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Auth } from "../utils/auth";
import { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Flex, Layout } from "antd";
import { Typography } from "antd";
import { CSSProperties } from "react";

const { Title } = Typography;

export const Route = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

const titleStyle: CSSProperties = { color: "white", marginBottom: 0 };
const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

function RootComponent() {
  return (
    <>
      <Layout>
        <Layout.Header style={headerStyle}>
          <Flex align="center" style={{ height: "100%" }}>
            <Title level={2} style={titleStyle}>
              RSS Reader
            </Title>
          </Flex>
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
