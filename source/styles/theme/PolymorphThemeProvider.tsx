import React from 'react';
import { ThemeProvider } from 'react-polymorph/lib/components/ThemeProvider';

import { Skins } from './skins';
import { reactPolymorphTheme } from './theme';

interface IProps {
  children: React.ReactNode;
}

const PolymorphThemeProvider = ({ children }: IProps) => (
  <ThemeProvider theme={reactPolymorphTheme} skins={Skins}>
    {children}
  </ThemeProvider>
);

export default PolymorphThemeProvider;
