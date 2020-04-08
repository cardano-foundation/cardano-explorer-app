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
      const windowObject: Window | any = window;
      windowObject.dataLayer = windowObject.dataLayer || [];
      function gtag(param: string, value: any, config?: any) {
        windowObject.dataLayer.push({ param, value });
      }
      gtag('js', new Date());
      gtag('config', environment.GA_TRACKING_ID);
      return null;
    };

    return (
      <Html style={cardanoExplorerTheme} lang={lang}>
        <Head />
        {environment.CARDANO.NETWORK === CardanoNetwork.MAINNET &&
          environment.GA_TRACKING_ID && (
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
