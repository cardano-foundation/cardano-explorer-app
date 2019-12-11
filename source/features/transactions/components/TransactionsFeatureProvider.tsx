import React, { useState } from 'react';
import { useGraphQLClient } from '../../../lib/graphql/GraphQLProvider';
import { useFeature } from '../../../lib/react/hooks';
import { transactionsContext } from '../context';
import { createTransactionsFeature, ITransactionsFeature } from '../index';

interface IProps {
  children: React.ReactNode;
}

export const TransactionsFeatureProvider = (props: IProps) => {
  const graphqlClient = useGraphQLClient();
  const [transactionsFeature] = useState<ITransactionsFeature>(
    createTransactionsFeature(graphqlClient)
  );
  useFeature(transactionsFeature);
  return (
    <transactionsContext.Provider value={transactionsFeature}>
      {props.children}
    </transactionsContext.Provider>
  );
};
