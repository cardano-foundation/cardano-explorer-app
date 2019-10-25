import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  if (environment.CARDANO_ERA === 'shelley') {
    Page = require('../apps/shelley/index').IndexPage;
  } else {
    // Default to Byron
    Page = require('../apps/byron/index').IndexPage;
  }
}

export default Page;
