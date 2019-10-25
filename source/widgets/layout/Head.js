import Head from 'next/head'

export default () => (
  <Head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta charSet="utf-8" />
    {/* TODO: Provide proper CSP */}
    <meta
      httpEquiv="Content-Security-Policy"
      content="
        default-src *  data: blob: 'unsafe-inline' 'unsafe-eval';
        script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
        connect-src * data: blob: 'unsafe-inline';
        img-src * data: blob: 'unsafe-inline';
        frame-src * data: blob: ;
        style-src * data: blob: 'unsafe-inline';
        font-src * data: blob: 'unsafe-inline';
      "
    />
  </Head>
);
