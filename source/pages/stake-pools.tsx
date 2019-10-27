import NextDefaultErrorPage from 'next/error';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  if (environment.CARDANO_ERA === 'shelley') {
    Page = require('../apps/shelley/stake-pools').StakePoolsPage;
  } else {
    Page = () => <NextDefaultErrorPage statusCode={404} />;
  }
}

export default Page;
