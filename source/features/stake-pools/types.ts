import { FC, MouseEvent } from 'react';
import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

export interface IStakePoolsProps {
  stakePoolsList: Array<IStakePoolProps>;
}
export interface IStakePoolsSearchProps {
  search: string;
  onSearch: Function;
}
export interface IStakePoolsListProps {
  stakePoolsList: Array<IStakePoolProps>;
  selectedPoolId: string | null | undefined;
  onSelect: Function;
  onClose: Function;
}
export interface IStakePoolProps {
  controlledStake: number;
  created_at: string;
  description: string;
  id: string;
  isCharity: boolean;
  name: string;
  performance: number;
  profitMargin: number;
  ranking: number;
  retiring: string | null;
  ticker: string;
  url: string;
}
export interface IStakePoolTooltipPositionProps {
  horizontal: 'left' | 'right';
  vertical: 'top' | 'bottom';
}
export interface IStakePoolTooltipProps {
  position: IStakePoolTooltipPositionProps;
  stakePool: IStakePoolProps;
  color: string;
  onClose: Function;
}
export interface IStakePoolsContext {
  api: StakePoolsApi;
  store: StakePoolsStore;
}
export interface IStakePoolThumbnailProps {
  stakePool: IStakePoolProps;
  children?: any;
  color: string;
  isSelected: boolean;
  onSelect(event: MouseEvent<HTMLElement>): void;
}
