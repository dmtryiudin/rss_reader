import { Flex, Spin } from 'antd';

export const Loading = () => {
  return (
    <Flex
      style={{ height: 'calc(100vh - 64px)' }}
      align="center"
      justify="center"
      vertical
    >
      <Spin size="large" />
    </Flex>
  );
};
