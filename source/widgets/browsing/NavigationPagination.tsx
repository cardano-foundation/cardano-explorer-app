import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigationFeature } from '../../features/navigation';
import Pagination from './Pagination';

export interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  onChangePage?: (page: number) => void;
  totalPages: number;
}

const NavigationPagination = (props: IPaginationProps) => {
  const { currentPage, itemsPerPage, totalPages } = props;
  const navigation = useNavigationFeature();
  const onChangePage = (page: number) => {
    navigation.actions.push.trigger({
      path: navigation.store.path,
      query: {
        ...navigation.store.query,
        page,
        perPage: itemsPerPage,
      },
    });
    props.onChangePage?.(page);
  };
  return (
    <Pagination
      currentPage={currentPage}
      onChangePage={onChangePage}
      totalPages={totalPages}
    />
  );
};

export default observer(NavigationPagination);
