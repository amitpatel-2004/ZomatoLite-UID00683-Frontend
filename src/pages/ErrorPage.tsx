import { useNavigate } from 'react-router-dom';
import { Button, Result, Layout } from 'antd';
import type { ErrorPageProps } from './errorPage.types';

const { Content } = Layout;

export const ErrorPage = ({
  status = '404',
  title = '404',
  subTitle = 'Sorry, the page you visited does not exist.',
  buttonText = 'Back Home',
  redirectTo = '/',
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Result
          status={status}
          title={title}
          subTitle={subTitle}
          extra={
            <Button type="primary" onClick={() => navigate(redirectTo)}>
              {buttonText}
            </Button>
          }
        />
      </Content>
    </Layout>
  );
};
