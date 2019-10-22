import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

const Layout = require('../../layout/Layout').default;
const OutdatedBrowser = require('../../features/widgets/outdated-browser/components/OutdatedBrowser')
  .default;
const FooterContainer = require('../../features/widgets/footer/containers/FooterContainer')
  .default;

export const OutdatedBrowserPage = () => (
  <NoSSR>
    <Layout hasContainer>
      <OutdatedBrowser
        text="Your web browser is out of date"
        updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
      />
      <FooterContainer />
    </Layout>
  </NoSSR>
);
