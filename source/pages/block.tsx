import debug from 'debug';
import { noop } from 'lodash';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../common/constants';
import { environment } from '../environment';
import BlockList from '../features/blocks/components/BlockList';
import BlockSummary from '../features/blocks/components/BlockSummary';
import Container from '../features/widgets/container/components/Container';
import FooterContainer from '../features/widgets/footer/containers/FooterContainer';
import Header from '../features/widgets/header/components/Header';
import Layout from '../layout/Layout';
import styles from './block.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

const blocks = [
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 138,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 1,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 2,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 137,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 3,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 4,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'e1496c9',
    epoch: 140,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 5,
  },
];

const blockSummary = {
  block: 11044,
  confirmations: 0,
  createdBy: '[BLSH] pool',
  epoch: 47,
  id: '502017e88ff3b7389a0c7e6f4a6c808d171938467c9adbdc059250ab4a8fee72',
  merkleRoot:
    '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
  nextBlock: '2111edea30970af11172bd8e2f05c7406cba8f20d9bb78c4fa62ba06881372e7',
  prevBlock: '1b6532a66b067f7b81691924f00c4abc1cfbe8496dcb150dba1704ac080c2dc0',
  size: 634,
  time: 1470006392000,
  title: 'Block Summary',
  transactions: 0,
};

let BlockPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout>
        <Header
          withSearch
          brandType={BrandType.SHRINKED}
          searchProps={{ onSearch: noop }}
        />
        <Container>
          <div className={styles.blockSummary}>
            <BlockSummary {...blockSummary} />
          </div>
          <div className={styles.blockList}>
            <BlockList title="Blocks" items={blocks} />
          </div>
        </Container>
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
