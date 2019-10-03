import { IStakePoolProps } from './types';

// const searchFields = ['slug', 'name'];

const stakePoolsListSearch = (
  stakePool: IStakePoolProps,
  rawSearch: string
) => {
  const search = rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  let pass = !search;
  if (!pass) {
    pass = RegExp(search, 'i').test(stakePool.slug);
    pass = RegExp(search, 'i').test(stakePool.name);
  }
  // searchFields.forEach((field: string) => {
  //   if (!pass) pass = RegExp(search, 'i').test(stakePool[field]);
  // });
  return pass;
};

export const getFilteredStakePoolsList = (
  stakePoolsList: Array<IStakePoolProps>,
  search: string
): Array<IStakePoolProps> =>
  stakePoolsList.filter((stakePool: IStakePoolProps) =>
    stakePoolsListSearch(stakePool, search)
  );
