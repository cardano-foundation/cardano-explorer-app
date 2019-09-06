import { observer } from 'mobx-react-lite';
import React from 'react';
import Footer from '../components/Footer';
import { useBlocks } from '../hooks';

export const FooterComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Footer
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const FooterComponentContainer = observer(FooterComponentContainerRaw);
