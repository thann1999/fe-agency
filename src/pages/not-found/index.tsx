import { Button, Space, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import NotFoundPage from '@assets/images/not-found-page.svg';

import './not-found-page.scss';

export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToHome = async () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{t('notFoundPage.title', 'Not Found Page')}</title>
      </Helmet>

      <div className="not-found-page">
        <Space className="content" direction="vertical" size={16}>
          <Typography.Title level={2} className="mb-0">
            {t('notFoundPage.title', 'Not Found Page')}
          </Typography.Title>

          <p>
            {t('notFoundPage.message', 'Oops! 😖 The requested URL was not found on this server.')}
          </p>

          <Button type="primary" className="mt-6" onClick={handleBackToHome}>
            {t('notFoundPage.backToHome', 'Back to home')}
          </Button>

          <NotFoundPage />
        </Space>
      </div>
    </>
  );
}
