import Chance from 'chance';
import { IBlockOverview } from '../../source/features/blocks/types';

const chance = new Chance();

export const generateFakeBlockOverview = (
  overrides?: Partial<IBlockOverview>
): IBlockOverview => ({
  createdAt: chance.date(),
  createdBy: chance.string({ alpha: true, length: 7, casing: 'lower' }),
  epoch: chance.integer({ min: 0, max: 999 }),
  id: chance.hash(),
  number: chance.integer({ min: 0, max: 100000 }),
  output: chance.floating({ min: 0, fixed: 6 }).toString(),
  size: chance.integer({ min: 100, max: 2000 }),
  slotWithinEpoch: chance.integer({ min: 0, max: 21600 }),
  transactionsCount: chance.integer({ min: 0, max: 1000 }).toString(),
  ...overrides,
});

export const generateFakeBlockOverviews = (count: number) =>
  new Array(count).fill(null).map(generateFakeBlockOverview);
