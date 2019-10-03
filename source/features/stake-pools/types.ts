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
  slug: string;
  name: string;
  performance: number;
  profitMargin: number;
  ranking: number;
  retiring: Date | null | undefined;
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
  top?: number;
  left?: number;
  color: string;
  containerClassName: string;
}

export interface IStakePoolsContext {
  api: StakePoolsApi;
  store: StakePoolsStore;
}
