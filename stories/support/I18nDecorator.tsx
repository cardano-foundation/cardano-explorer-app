import React from 'react';
import { SupportedLocale } from '../../source/features/i18n/types';
import { I18nFeatureProvider } from '../../source/features/i18n/ui/I18nFeatureProvider';

interface IProps {
  children: React.ReactNode;
}

export const I18nDecorator = ({ children }: IProps) => (
  <I18nFeatureProvider locale={SupportedLocale.EN}>
    {children}
  </I18nFeatureProvider>
);
