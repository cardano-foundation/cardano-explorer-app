import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

export interface IStakePoolsProps {
  stakePoolsList: Array<IStakePoolProps>;
}

export interface IStakePoolsSearchProps {
  search: string;
  onSearch: () => void;
}

export interface IStakePoolsListProps {
  stakePoolsList: Array<IStakePoolProps>;
  selectedPoolId: string | null | undefined;
  onSelect: () => void;
  onClose: () => void;
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
  retiring: string | null;
  created_at: string;
  isCharity: boolean;
  url: string;
}

export interface IStakePoolThumbnailProps {
  stakePool: IStakePoolProps;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
}

export interface IStakePoolTooltipProps {
  stakePool: IStakePoolProps;
  onClose: () => void;
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
