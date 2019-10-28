import React from 'react';
import NoSSR from 'react-no-ssr';
import { CardanoEra } from '../constants';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  if (environment.CARDANO.ERA === CardanoEra.SHELLEY) {
    Page = require('../apps/shelley/index').IndexPage;
  } else {
    // Default to Byron
    Page = require('../apps/byron/index').IndexPage;
  }
}

export default Page;
