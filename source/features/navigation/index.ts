import { NextRouter } from 'next/router';
import React, { useContext } from 'react';
import Action from '../../lib/Action';
import { ensureContextExists } from '../../lib/react/hooks';
import { NavigationStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class NavigationActions {
  public redirectTo: Action<{ path: string }> = new Action();
  public goToEpochDetailsPage: Action<{ number: number }> = new Action();
  public goToBlockDetailsByNumber: Action<{ number: number }> = new Action();
  public goToBlockDetailsById: Action<{ id: string }> = new Action();
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
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createNavigationFeature = (
  router: NextRouter
): INavigationFeature => {
  const navigationActions = new NavigationActions();
  const navigationStore = new NavigationStore(navigationActions, router);

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
