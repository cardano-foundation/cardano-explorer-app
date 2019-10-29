import React from 'react';
import { IBlocksContext } from './types';

export const blocksContext = React.createContext<IBlocksContext | null>(null);
