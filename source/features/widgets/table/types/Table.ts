import React from 'react';

export type Transform<D = any, T = any> = (d: D) => T;
export type CellHeaderTemplate = string | React.ReactNode;
export type CellTemplate<T = any, C = any> =
  | string
  | Transform<T, C>
  | React.ReactNode;

export interface IColumnDefinition<R = any, CE = any, CO = any> {
  cellRender?: CellTemplate<CE, CO>;
  cellValue?: Transform<R, CE>;
  cssClass?: string;
  head: CellHeaderTemplate;
  key: string;
}
