import { Alert, Flex } from 'antd';

export const Error = () => {
  const alertStyle = { minWidth: 600 };

  return (
    <Flex
      style={{ height: 'calc(100vh - 64px)' }}
      align="center"
      justify="center"
      vertical
    >
      <Alert
        style={alertStyle}
        message="Error"
        description={'Something went wrong'}
        type="error"
        showIcon
      />
    </Flex>
  );
};
