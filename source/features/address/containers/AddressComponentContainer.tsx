import { observer } from 'mobx-react-lite';
import React from 'react';
import Address from '../components/Address';
import { useBlocks } from '../hooks';

export const AddressComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Address
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const AddressComponentContainer = observer(AddressComponentContainerRaw);
