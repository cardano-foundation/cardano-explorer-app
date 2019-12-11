import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { ITransactionsFeature } from './index';

/**
 * React context used for this feature
 */
export const transactionsContext = React.createContext<ITransactionsFeature | null>(
  null
);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useTransactionsFeature = (): ITransactionsFeature =>
  ensureContextExists<ITransactionsFeature>(transactionsContext);
