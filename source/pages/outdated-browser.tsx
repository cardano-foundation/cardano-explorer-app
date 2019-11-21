import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import OutdatedBrowser from '../features/outdated-browser/OutdatedBrowser';
import { Footer, Layout } from '../widgets/layout';

let OutdatedBrowserPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  OutdatedBrowserPage = () => (
    <NoSSR>
      <Layout>
        <OutdatedBrowser
          text="Your web browser is out of date"
          updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
        />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default OutdatedBrowserPage;
