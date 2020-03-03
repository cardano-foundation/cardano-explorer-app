import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import React from 'react';

export function isNotNull<T>(b: T | null): b is T {
  return b != null;
}

export type PageComponentWithStaticLayout = NextComponentType<
  NextPageContext,
  any
> & {
  getStaticLayout: () => React.FunctionComponent;
};

export type StaticLayoutProps = {
  children: React.ReactChildren;
};
