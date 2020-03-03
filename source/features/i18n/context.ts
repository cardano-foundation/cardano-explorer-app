import React from 'react';
import { ensureContextExists } from '../../lib/react/hooks';
import { I18nFeature } from './index';

/**
 * React context used for this feature
 */
export const i18nContext = React.createContext<I18nFeature | null>(null);
/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useI18nFeature = (): I18nFeature =>
  ensureContextExists<I18nFeature>(i18nContext);
