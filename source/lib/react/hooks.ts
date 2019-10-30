import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Store } from '../Store';

export const useFeature = (feature: { store: Store }) => {
  useLayoutEffect(() => {
    // Start feature store before first render is done
    feature.store.start();
  }, []);
  useEffect(() => {
    // Stop store on unmount
    return () => feature.store.stop();
  }, []);
};

const contextMissingError = new Error(
  'You need to provide the context before using it.'
);

export function ensureContextExists<T>(context: React.Context<T | null>): T {
  const instance = useContext(context);
  if (!instance) {
    throw contextMissingError;
  }
  return instance;
}
