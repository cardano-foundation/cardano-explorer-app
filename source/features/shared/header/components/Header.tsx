import { observer } from 'mobx-react-lite';

export interface IHeaderProps {
  title: string;
}

const Header = (props: IHeaderProps) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

export default observer(Header);
