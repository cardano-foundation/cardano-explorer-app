import { MouseEvent } from 'react';
import { StakePoolsActions } from './actions';
import { StakePoolsApi } from './api';
import { StakePoolsStore } from './store';

type GenericArgFn = (arg: string) => void;
type GenericFn = () => void;

export interface IStakePoolsProps {
  stakePoolsList: Array<IStakePoolProps>;
}

export interface IStakePoolsSearchProps {
  search: string;
  onSearch: GenericArgFn;
  onInputChange: GenericArgFn;
}

export interface IStakePoolsListProps {
  stakePoolsList: Array<IStakePoolProps>;
  selectedPoolId: string | null | undefined;
  onSelect: GenericArgFn;
  onClose: GenericFn;
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
  onClose: GenericFn;
}
export interface IStakePoolsContext {
  actions: StakePoolsActions;
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
export interface IUnmoderatedDataWarning {
  onAcceptUnmoderatedData: (arg0: any) => void;
  type: string;
}
export interface IUnmoderatedDataConsented {
  type: string;
}
