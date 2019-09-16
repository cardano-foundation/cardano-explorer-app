import { observer } from 'mobx-react-lite';
import React from 'react';
import Footer from '../components/Footer';

export const FooterComponentContainerRaw = () => {
  return <Footer propFirst={''} propSecond={''} />;
};

export const FooterComponentContainer = observer(FooterComponentContainerRaw);
