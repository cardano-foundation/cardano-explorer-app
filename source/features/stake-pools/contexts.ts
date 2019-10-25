import React from 'react';
import { IStakePoolsContext } from './types';

export const stakePoolsContext = React.createContext<IStakePoolsContext | null>(
  null
);
