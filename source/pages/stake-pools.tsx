import NextDefaultErrorPage from 'next/error';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { CardanoEra } from '../constants';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  if (environment.CARDANO.ERA === CardanoEra.SHELLEY) {
    Page = require('../apps/shelley/stake-pools').StakePoolsPage;
  } else {
    Page = () => <NextDefaultErrorPage statusCode={404} />;
  }
}

export default Page;
