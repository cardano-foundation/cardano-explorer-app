import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { environment } from '../../environment';
import { Store } from '../Store';

/**
 * Manages the lifecycle of a feature based on its provider component.
 *
 * 1. Starts the feature store when the enclosing component mounts
 * 2. Stops the store on unmount
 * @param feature
 */
export const useFeature = (feature: { store: Store }, isIsomorphic = false) => {
  if (isIsomorphic) {
    feature.store.start();
  } else if (environment.IS_CLIENT) {
    useLayoutEffect(() => {
      // Start feature store before first render is done
      feature.store.start();
    }, []);
  }
  // Don't use any effects on server-side
  if (environment.IS_SERVER) {
    return;
  }
  useEffect(() => {
    // Stop store on unmount
    return () => {
      feature.store.stop();
    };
  }, []);
};

/**
 * Throws an error if the feature context hasn't been provided
 * before a component tries to use the feature.
 *
 * @param context
 */
export function ensureContextExists<T>(context: React.Context<T | null>): T {
  const instance = useContext(context);
  if (!instance) {
    throw new Error(`You need to provide a context before using it.`);
  }
  return instance;
}
