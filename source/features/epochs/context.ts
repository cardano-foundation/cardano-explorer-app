import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { IEpochsFeature } from './index';

/**
 * React context used for this feature
 */
export const epochsContext = React.createContext<IEpochsFeature | null>(null);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useEpochsFeature = (): IEpochsFeature =>
  ensureContextExists<IEpochsFeature>(epochsContext);
