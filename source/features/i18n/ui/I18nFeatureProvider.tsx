import React, { useState } from 'react';
import { useFeature } from '../../../lib/react/hooks';
import { i18nContext } from '../context';
import { createI18nFeature, I18nFeature } from '../index';
import { SupportedLocale } from '../types';

interface IProps {
  locale: SupportedLocale;
  children: React.ReactNode;
}

export const I18nFeatureProvider = (props: IProps) => {
  const [i18nFeature] = useState<I18nFeature>(createI18nFeature(props.locale));
  useFeature(i18nFeature, true);
  return (
    <i18nContext.Provider value={i18nFeature}>
      {props.children}
    </i18nContext.Provider>
  );
};
