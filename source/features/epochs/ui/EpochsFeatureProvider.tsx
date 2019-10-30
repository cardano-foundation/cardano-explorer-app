import React, { useState } from 'react';
import { useFeature } from '../../../lib/react/hooks';
import { createEpochsFeature, epochsContext, IEpochsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const EpochsFeatureProvider = (props: IProps) => {
  const [epochsFeature] = useState<IEpochsFeature>(createEpochsFeature());
  useFeature(epochsFeature);
  return (
    <epochsContext.Provider value={epochsFeature}>
      {props.children}
    </epochsContext.Provider>
  );
};
