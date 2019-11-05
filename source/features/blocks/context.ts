import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { IBlocksFeature } from './index';

/**
 * React context used for this feature
 */
export const blocksContext = React.createContext<IBlocksFeature | null>(null);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useBlocksFeature = (): IBlocksFeature =>
  ensureContextExists<IBlocksFeature>(blocksContext);
