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
  id: string;
  controlledStake: number;
  description: string;
  ticker: string;
  name: string;
  performance: number;
  profitMargin: number;
  ranking: number;
  retiring: string | null;
  created_at: string;
  isCharity: boolean;
  url: string;
}

export interface IStakePoolThumbnailProps {
  stakePool: IStakePoolProps;
  isSelected: boolean;
  onSelect: Function;
  onClose: Function;
}

export interface IStakePoolTooltipProps {
  stakePool: IStakePoolProps;
  onClose: Function;
  color: string;
  position: IStakePoolTooltipPositionProps;
}

export interface IStakePoolTooltipPositionProps {
  horizontal: 'left' | 'right';
  vertical: 'top' | 'bottom';
}

export interface IStakePoolsContext {
  api: StakePoolsApi;
  store: StakePoolsStore;
}
