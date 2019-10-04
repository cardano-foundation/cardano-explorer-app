import { IStakePoolProps, IStakePoolTooltipPositionProps } from './types';
import { MouseEvent } from 'react';

const THUMBNAIL_VERTICAL_POSITION = -38;
const THUMBNAIL_HORIZONTAL_POSITION = 77;
const SEARCH_FIELDS = ['slug', 'name'];

const stakePoolsListSearch = (
  stakePool: IStakePoolProps,
  rawSearch: string
) => {
  const search = rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  let pass = !search;
  SEARCH_FIELDS.forEach((field: string) => {
    if (!pass) pass = RegExp(search, 'i').test((window as any)[field]);
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

export const getTooltipPosition = (event: MouseEvent<HTMLElement>) => {
  const button = event.target as HTMLButtonElement;
  const target = button.parentNode as HTMLElement;
  const position: IStakePoolTooltipPositionProps = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  };
  const { top: thumbTop, left: thumbLeft } = target.getBoundingClientRect();
  const thumnailVerticalPosition =
    thumbTop > window.innerHeight / 2 ? 'bottom' : 'top';
  const thumnailHorizontalPosition =
    thumbLeft > window.innerWidth / 2 ? 'right' : 'left';
  position[thumnailVerticalPosition] = THUMBNAIL_VERTICAL_POSITION;
  position[thumnailHorizontalPosition] = THUMBNAIL_HORIZONTAL_POSITION;
  return position;
};
