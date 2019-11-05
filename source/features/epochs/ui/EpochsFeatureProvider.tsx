import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { epochsContext } from '../context';
import { createEpochsFeature, IEpochsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const EpochsFeatureProvider = (props: IProps) => {
  const apolloClient = useApolloClient();
  const [epochsFeature] = useState<IEpochsFeature>(
    createEpochsFeature(apolloClient)
  );
  useFeature(epochsFeature);
  return (
    <epochsContext.Provider value={epochsFeature}>
      {props.children}
    </epochsContext.Provider>
  );
};
