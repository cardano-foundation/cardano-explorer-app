import { useEffect, useLayoutEffect } from 'react';
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
