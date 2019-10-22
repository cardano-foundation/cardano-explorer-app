import NextDefaultErrorPage from 'next/error';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

let Page = () => <NoSSR />;
if (environment.IS_CLIENT) {
  if (environment.IS_RUST_CLIENT) {
    Page = require('../apps/rust/stake-pools').StakePoolsPage;
  } else {
    Page = () => <NextDefaultErrorPage statusCode={404} />;
  }
}

export default Page;
