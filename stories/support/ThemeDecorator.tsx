import React from 'react';
import '../../source/features/theme/index.global.scss';
import PolymorphThemeProvider from '../../source/features/theme/PolymorphThemeProvider';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => {
  return <PolymorphThemeProvider>{children}</PolymorphThemeProvider>;
};
