import { observer } from 'mobx-react-lite';
import React from 'react';
import Footer from '../components/Footer';
import { useBlocks } from '../hooks';

export const FooterComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Footer footerPropFirst={''} footerPropSecond={''} />;
};

export const FooterComponentContainer = observer(FooterComponentContainerRaw);
