import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../../environment';
import OutdatedBrowser from '../../features/widgets/outdated-browser/components/OutdatedBrowser';
import { Footer, Layout } from '../../layout';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

export const OutdatedBrowserPage = () => (
  <NoSSR>
    <Layout hasContainer>
      <OutdatedBrowser
        text="Your web browser is out of date"
        updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
      />
      <Footer />
    </Layout>
  </NoSSR>
);
