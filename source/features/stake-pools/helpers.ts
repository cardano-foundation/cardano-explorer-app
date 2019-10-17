import { MouseEvent } from 'react';
import { SEARCH_FIELDS } from './constants';
import { IStakePoolProps, IStakePoolTooltipPositionProps } from './types';

const stakePoolsListSearch = (
  stakePool: IStakePoolProps,
  rawSearch: string
) => {
  const search = rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  let pass = !search;
  SEARCH_FIELDS.forEach((field: string) => {
    if (!pass) {
      pass = RegExp(search, 'i').test((window as any)[field]);
    }
  });
  return pass;
};
export const getFilteredStakePoolsList = (
  stakePoolsList: Array<IStakePoolProps>,
  search: string
): Array<IStakePoolProps> =>
  stakePoolsList.filter((stakePool: IStakePoolProps) =>
    stakePoolsListSearch(stakePool, search)
  );
export const getTooltipPosition = (
  event: MouseEvent<HTMLElement>
): IStakePoolTooltipPositionProps => {
  const button = event.target as HTMLButtonElement;
  const target = button.parentNode as HTMLElement;
  const { top: thumbTop, left: thumbLeft } = target.getBoundingClientRect();
  const vertical = thumbTop > window.innerHeight / 2 ? 'bottom' : 'top';
  const horizontal = thumbLeft > window.innerWidth / 2 ? 'right' : 'left';
  return { vertical, horizontal };
};
