import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { INetworkInfoFeature } from './index';

/**
 * The React context that can be reused and configured with instances
 * of the network info feature (also multiple times on one page)
 */
export const networkInfoContext = React.createContext<INetworkInfoFeature | null>(
  null
);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useNetworkInfoFeature = () =>
  ensureContextExists(networkInfoContext);
