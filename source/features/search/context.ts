import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { ISearchFeature } from './index';

/**
 * The React context that can be reused and configured with instances
 * of the search feature (also multiple times on one page)
 */
export const searchContext = React.createContext<ISearchFeature | null>(null);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useSearchFeature = () => ensureContextExists(searchContext);
