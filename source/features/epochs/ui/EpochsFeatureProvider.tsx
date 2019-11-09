import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useFeature } from '../../../lib/react/hooks';
import { useNetworkInfoFeature } from '../../network-info/context';
import { epochsContext } from '../context';
import { createEpochsFeature, IEpochsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const EpochsFeatureProvider = (props: IProps) => {
  const apolloClient = useApolloClient();
  const networkInfo = useNetworkInfoFeature();
  const [epochsFeature] = useState<IEpochsFeature>(
    createEpochsFeature(networkInfo, apolloClient)
  );
  useFeature(epochsFeature);
  return (
    <epochsContext.Provider value={epochsFeature}>
      {props.children}
    </epochsContext.Provider>
  );
};
