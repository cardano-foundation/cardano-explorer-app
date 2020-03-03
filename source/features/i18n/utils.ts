import { NextPageContext } from 'next';
import { SUPPORTED_LOCALES } from './index';

interface IContext extends NextPageContext {
  language: string;
}

export const i18nInitialProps = async (context: IContext) => {
  return {
    locale: context.query.locale,
  };
};

export function isSupportedLocale(value?: string): boolean {
  return SUPPORTED_LOCALES.includes(value);
}
