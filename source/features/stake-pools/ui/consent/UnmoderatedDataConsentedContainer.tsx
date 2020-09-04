import React, { useState } from 'react';
import { useObservableEffect } from '../../../../lib/mobx/react';
import { useStakePools } from '../../context';
import UnmoderatedDataConsented from './UnmoderatedDataConsented';

export const UnmoderatedDataConsentedContainer = () => {
  const { store } = useStakePools();
  const [showUnmoderatedData, setShowUnmoderatedData] = useState(
    store.showUnmoderatedData
  );

  // Observe and update consent flag
  useObservableEffect(() => {
    setShowUnmoderatedData(store.showUnmoderatedData);
  });

  if (showUnmoderatedData) {
    return <UnmoderatedDataConsented />;
  }
  return null;
};
