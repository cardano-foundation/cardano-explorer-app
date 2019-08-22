import React from 'react';
import { ThemeProvider } from 'react-polymorph/lib/components/ThemeProvider';

import { Skins } from './skins';
import { Theme } from './theme';

interface IProps {
  children: React.ReactNode;
}

const PolymorphThemeProvider = ({ children }: IProps) => (
  <ThemeProvider theme={Theme} skins={Skins}>
    {children}
  </ThemeProvider>
);

export default PolymorphThemeProvider;
