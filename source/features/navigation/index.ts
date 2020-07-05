import React, { useContext } from 'react';
import Action from '../../lib/Action';
import { debugActions } from '../../lib/logging';
import { ensureContextExists } from '../../lib/react/hooks';
import { I18nFeature } from '../i18n';
import { NavigationStore } from './store';

export interface INavigationQueryParams {
  [key: string]: number | string | string[];
}

/**
 * Defines the actions that are supported by this feature
 */
@debugActions('CE.navigation.actions')
export class NavigationActions {
  public push: Action<{
    path?: string;
    query?: INavigationQueryParams;
  }> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface INavigationFeature {
  actions: NavigationActions;
  store: NavigationStore;
  start: () => void;
  stop: () => void;
}

/**
 * This is the minimal interface needed to interact with NextRouter
 */
export interface INavigationRouterDependency {
  asPath: string;
  events: {
    on: (type: string, callback: (url: string) => void) => void;
    off: (type: string, callback: (url: string) => void) => void;
  };
  push: (url: string, as: string) => void;
}

/**
 * Declare dependencies of the navigation feature
 */
export interface INavigationFeatureDependencies {
  i18n: I18nFeature;
  router: INavigationRouterDependency;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createNavigationFeature = ({
  i18n,
  router,
}: INavigationFeatureDependencies): INavigationFeature => {
  const navigationActions = new NavigationActions();
  const navigationStore = new NavigationStore(navigationActions, router, i18n);

  return {
    actions: navigationActions,
    store: navigationStore,
    start() {
      navigationStore.start();
    },
    stop() {
      navigationStore.stop();
    },
  };
};

/**
 * The React context that can be reused and configured with instances
 * of the search feature (also multiple times on one page)
 */
export const navigationContext = React.createContext<INavigationFeature | null>(
  null
);

/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useNavigationFeature = () =>
  ensureContextExists(navigationContext);

export const useNavigationFeatureOptionally = () =>
  useContext(navigationContext);
