import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useI18nFeature } from '../features/i18n/context';

/**
 * The index page is the only correct route that does not have
 * the requested locale embedded in the URL. That's why we redirect
 * either to the default locale (en) or to the locale of the last user session
 */
const IndexPage = () => {
  const router = useRouter();
  const i18n = useI18nFeature();
  React.useEffect(() => {
    // Simply redirect to the correct locale:
    router.replace('/[locale]', `/${i18n.store.locale}`);
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default IndexPage;
