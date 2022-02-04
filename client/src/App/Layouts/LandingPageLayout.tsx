import * as React from 'react';

import LandingPageHeader from './LandingPageHeader';
import Helmet from 'react-helmet';

const LandingPageLayout: React.FC<{
  path?: string;
  title?: string;
  children?: any;
  description?: string;
}> = ({ path, title, children, description }) => {
  return (
    <div>
      <Helmet title={title}>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <LandingPageHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginTop: 100,
          marginBottom: 100,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LandingPageLayout;
