import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import React from 'react';

export function isDefined<T>(v: T | null | undefined): v is T {
  return v !== undefined && v !== null;
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
