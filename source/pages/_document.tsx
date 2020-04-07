import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { CardanoNetwork } from '../constants';
import { environment } from '../environment';
import { DEFAULT_LOCALE } from '../features/i18n';
import { cardanoExplorerTheme } from '../styles/theme/theme';

class CardanoExplorerDocument extends Document {
  public render() {
    const lang =
      this.props.__NEXT_DATA__.props?.pageProps?.locale || DEFAULT_LOCALE;

    const injectGA = () => {
      if (typeof window === 'undefined') {
        return;
      }
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        // @ts-ignore
        window.dataLayer.push(arguments);
      }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', 'UA-119953429-17');
      return null;
    };

    return (
      <Html style={cardanoExplorerTheme} lang={lang}>
        <Head />
        {environment.CARDANO.NETWORK === CardanoNetwork.MAINNET && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-119953429-17"
            />
            <script>{injectGA()}</script>
          </>
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CardanoExplorerDocument;
