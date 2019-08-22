import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  public render() {
    return (
      <Html>
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

          <style>{`
            * {
              box-sizing: border-box;
            }
            html, body, #__next {
              padding: 0;
              margin: 0;
              min-height: 100vh;
              -webkit-font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
            }
            @media screen and (-webkit-min-device-pixel-ratio:0) {
              select,
              textarea,
              input {
                font-size: 16px !important; // ios zoom input focus fix
              }
            }
        `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
