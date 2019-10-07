import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import BlockList from '../features/blocks/components/BlockList';
import EpochList from '../features/epochs/components/EpochList';
import Footer from '../features/widgets/footer/components/Footer';
import Header, {
  BrandType,
} from '../features/widgets/header/components/Header';
import styles from '../layout/Layout.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let IndexPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;

  IndexPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <div className={styles.container}>
          <Header withBackground withSearch brandType={BrandType.ENLARGED} />
          <EpochList title="Latest Epochs" items={[]} />
          <BlockList items={[]} />
          <Footer propFirst="" propSecond="" />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;
