import { observer } from 'mobx-react-lite';
import { NextRouter } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Pagination from './Pagination';

export interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  router: NextRouter;
}

const RouterPagination = (props: IPaginationProps) => {
  const { currentPage, itemsPerPage, router, totalPages } = props;
  const onChangePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
        perPage: itemsPerPage,
      },
    });
  };
  return (
    <Pagination
      currentPage={currentPage}
      onChangePage={onChangePage}
      totalPages={totalPages}
    />
  );
};

export default observer(RouterPagination);
