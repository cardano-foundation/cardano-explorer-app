interface ICalculatePagingInputs {
  currentPage?: number | string; // user input
  perPage?: number | string; // user input
  perPageDefault?: number;
  perPageMaximum?: number;
  perPageMinimum?: number;
  totalItems: number;
}

export interface ICalculatePagingOutputs {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export const PAGING_DEFAULTS = {
  PER_PAGE: 5,
  PER_PAGE_MAXIMUM: 50,
  PER_PAGE_MINIMUM: 1,
};

/**
 * Calculates correct paging state based on potentially invalid / missing
 * user input by using sensible defaults and constraints.
 * @param params
 */
export const calculatePaging = (
  params: ICalculatePagingInputs
): ICalculatePagingOutputs => {
  if (params.totalItems <= 0) {
    return {
      currentPage: 0,
      itemsPerPage: 0,
      totalPages: 0,
    };
  }

  const perPageMinimum = Math.abs(
    params.perPageMinimum || PAGING_DEFAULTS.PER_PAGE_MINIMUM
  );
  const perPageDefault = Math.abs(
    params.perPageDefault || Math.max(perPageMinimum, PAGING_DEFAULTS.PER_PAGE)
  );
  const perPageMaximum = Math.abs(
    params.perPageMaximum ||
      Math.min(params.totalItems, PAGING_DEFAULTS.PER_PAGE_MAXIMUM)
  );

  let itemsPerPage =
    params.perPage != null && params.perPage !== ''
      ? parseInt(params.perPage.toString(), 10)
      : null;
  if (itemsPerPage == null) {
    itemsPerPage = perPageDefault;
  } else if (itemsPerPage < perPageMinimum) {
    itemsPerPage = perPageMinimum;
  } else if (itemsPerPage > perPageMaximum) {
    itemsPerPage = perPageMaximum;
  }

  const totalPages = Math.ceil(params.totalItems / itemsPerPage);

  let currentPage =
    params.currentPage != null && params.currentPage !== ''
      ? parseInt(params.currentPage.toString(), 10)
      : null;
  if (currentPage == null || currentPage > totalPages) {
    currentPage = totalPages;
  } else if (currentPage <= 0) {
    currentPage = 1;
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
  };
};
