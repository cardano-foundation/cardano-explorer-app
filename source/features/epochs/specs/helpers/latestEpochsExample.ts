import { IBlockOverview } from '../../../blocks/types';

export const latestEpochsExample = [
  {
    blocks: [
      {
        createdAt: new Date('2017/10/01 03:26:51'),
        createdBy: '1deb829',
        epoch: 1,
        id: '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634',
        number: 31070,
        output: '0',
        size: 666,
        slotWithinEpoch: 9486,
        transactionsCount: '0',
      },
    ] as IBlockOverview[],
    blocksCount: 9485,
    lastBlockAt: new Date('2017-10-01T02:25:51'),
    number: 1,
    output: '17282903106017760',
    percentage: 100,
    slotsCount: 21600,
    startedAt: new Date('2017-09-28T21:45:51'),
    transactionsCount: '5344',
  },
  {
    blocks: [
      {
        createdAt: new Date('2017/10/01 03:26:51'),
        createdBy: '1deb829',
        epoch: 0,
        id: '84e9de7924aba73f58b81e142f4bce7f1d00cf4630f94f631e6ca3594b2d1634',
        number: 31070,
        output: '0',
        size: 666,
        slotWithinEpoch: 9486,
        transactionsCount: '0',
      },
    ] as IBlockOverview[],
    blocksCount: 21587,
    lastBlockAt: new Date('2017-09-28T21:26:11+00:00'),
    number: 0,
    output: '10378568796482912',
    percentage: 100,
    slotsCount: 21600,
    startedAt: new Date('2017-09-24T16:09:11'),
    transactionsCount: '33',
  },
];
