import React from 'react';
import PolymorphThemeProvider from '../../source/styles/theme/PolymorphThemeProvider';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => {
  return <PolymorphThemeProvider>{children}</PolymorphThemeProvider>;
};
