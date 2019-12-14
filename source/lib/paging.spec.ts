import { calculatePaging } from './paging';

describe('Paging calculation', () => {
  it('per page defaults to 5 items', () => {
    const result = calculatePaging({
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(2);
  });

  it('per page minimum is 1 item by default', () => {
    const result = calculatePaging({
      perPage: 0,
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(10);
  });

  it('limits per page to maximum', () => {
    const result = calculatePaging({
      perPage: 3,
      perPageMaximum: 2,
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(5);
  });

  it('handles empty per page param', () => {
    const result = calculatePaging({
      perPage: '',
      totalItems: 10,
    });
    expect(result).toEqual({
      currentPage: 2,
      itemsPerPage: 5,
      totalPages: 2,
    });
  });

  it('gives back the latest page if current page is undefind', () => {
    const result = calculatePaging({
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(2);
  });

  it('current page maximum is constraint to total pages', () => {
    const result = calculatePaging({
      currentPage: 3,
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(2);
  });

  it('current page minimum is constraint to first page', () => {
    const result = calculatePaging({
      currentPage: 0,
      totalItems: 10,
    });
    expect(result.currentPage).toEqual(1);
  });

  it('handles empty current page param', () => {
    const result = calculatePaging({
      currentPage: '',
      totalItems: 10,
    });
    expect(result).toEqual({
      currentPage: 2,
      itemsPerPage: 5,
      totalPages: 2,
    });
  });

  it('returns zero result if total items is not positive', () => {
    const result = calculatePaging({
      totalItems: 0,
    });
    expect(result).toEqual({
      currentPage: 0,
      itemsPerPage: 0,
      totalPages: 0,
    });
  });

  it('ceils the total pages', () => {
    const result = calculatePaging({
      perPage: 2,
      totalItems: 3,
    });
    expect(result).toEqual({
      currentPage: 2,
      itemsPerPage: 2,
      totalPages: 2,
    });
  });
});
