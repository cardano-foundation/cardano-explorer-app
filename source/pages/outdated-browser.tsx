import React from 'react';
import OutdatedBrowser from '../features/outdated-browser/OutdatedBrowser';
import { Layout } from '../widgets/layout';

const OutdatedBrowserPage = () => (
  <OutdatedBrowser
    text="Your web browser is out of date"
    updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
  />
);

OutdatedBrowserPage.getStaticLayout = (page: React.ReactNode) => (
  <Layout>{page}</Layout>
);
OutdatedBrowserPage.pageTitle = 'Cardano Explorer | Outdated Browser';

export default OutdatedBrowserPage;
