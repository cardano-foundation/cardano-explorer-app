import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './Header.scss';

export interface IHeaderProps {
  title: string;
}

const Header = (props: IHeaderProps) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

export default observer(Header);
