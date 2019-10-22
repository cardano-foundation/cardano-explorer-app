import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  Page = require('../apps/shared/no-search-results').NoSearchResultsPage;
}

export default Page;
