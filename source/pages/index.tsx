import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import BlockList from '../features/blocks/components/BlockList';
import { IBlockListRowProps } from '../features/blocks/components/BlockListRow';
import EpochList from '../features/epochs/components/EpochList';
import { IEpochListRowProps } from '../features/epochs/components/EpochListRow';
import Footer from '../features/widgets/footer/components/Footer';
import Header, {
  BrandType,
} from '../features/widgets/header/components/Header';
import styles from './index.scss';

export interface IMainPageProps {
  epochs: Array<IEpochListRowProps>;
  blocks: Array<IBlockListRowProps>;
}

const Layout = require('../layout/Layout').default;
const headerBackgroundImageUrl = require('../static/assets/images/main-header-background.png');
const headerBackgroundImage2Url = require('../static/assets/images/main-header-background@2x.png');
const headerBackgroundImage3Url = require('../static/assets/images/main-header-background@3x.png');
const SideBackgroundImage = require('../static/assets/images/main-side-background.svg');

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let IndexPage = (props: IMainPageProps) => <NoSSR />;

if (environment.IS_CLIENT) {
  IndexPage = (props: IMainPageProps) => (
    <NoSSR>
      <Layout hasContainer>
        <div className={styles.headerBackgroundImageContainer}>
          <img
            src={headerBackgroundImageUrl}
            alt=""
            srcSet={`${headerBackgroundImage2Url} 2x, ${headerBackgroundImage3Url} 3x`}
            className={styles.headerBackgroundImage}
          />
        </div>
        <div className={styles.sideBackgroundImageContainer}>
          <SideBackgroundImage className={styles.sideBackgroundImage} />
        </div>
        <Header withSearch brandType={BrandType.ENLARGED} />
        <div className={styles.epochList}>
          <EpochList title="Latest Epochs" items={props.epochs} />
        </div>
        <div className={styles.blockList}>
          <BlockList title="Latest Blocks" items={props.blocks} />
        </div>
        <Footer propFirst="" propSecond="" />
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;
