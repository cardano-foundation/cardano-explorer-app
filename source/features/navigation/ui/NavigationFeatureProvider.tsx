import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFeature } from '../../../lib/react/hooks';
import {
  createNavigationFeature,
  INavigationFeature,
  navigationContext,
} from '../index';

interface IProps {
  children: React.ReactNode;
}

export const NavigationFeatureProvider = (props: IProps) => {
  const [navigationFeature] = useState<INavigationFeature>(
    createNavigationFeature(useRouter())
  );
  useFeature(navigationFeature);
  return (
    <navigationContext.Provider value={navigationFeature}>
      {props.children}
    </navigationContext.Provider>
  );
};
