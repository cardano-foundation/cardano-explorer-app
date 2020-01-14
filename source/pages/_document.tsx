import Document, { Head, Html, Main, NextScript } from 'next/document';
import { cardanoExplorerTheme } from '../styles/theme/theme';

class MyDocument extends Document {
  public render() {
    return (
      <Html style={cardanoExplorerTheme}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
