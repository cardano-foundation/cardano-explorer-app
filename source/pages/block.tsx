import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  Page = require('../apps/shared/block').BlockPage;
}

export default Page;
