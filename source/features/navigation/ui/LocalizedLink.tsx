import Link, { LinkProps } from 'next/link';
import React from 'react';
import { useI18nFeature } from '../../i18n/context';
import styles from './LocalizedLink.module.scss';

export const LocalizedLink = (
  props: LinkProps & {
    children: React.ReactNode;
  }
) => {
  const i18n = useI18nFeature();
  return (
    <Link
      {...props}
      href={`/[locale]${props.href}`}
      as={`/${i18n.store.locale}${props.href}`}
    >
      <a className={styles.link}>{props.children}</a>
    </Link>
  );
};
