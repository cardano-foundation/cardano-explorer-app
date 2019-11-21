import { useEffect } from 'react';

export interface IBrowseInRangeBounds {
  lower: number;
  upper: number;
}

interface ICalcBrowseBoundsOptions {
  total: number;
  perPageDefault: number;
  perPageMaximum: number;
  perPageMinimum: number;
  userParamLower?: string;
  userParamUpper?: string;
}

const calculateBrowseBounds = ({
  total,
  perPageDefault,
  perPageMaximum,
  perPageMinimum,
  userParamLower,
  userParamUpper,
}: ICalcBrowseBoundsOptions): IBrowseInRangeBounds => {
  const isLowerParamGiven = userParamLower !== undefined;
  const isUpperParamGiven = userParamUpper !== undefined;
  const areNoParamsGiven = !isLowerParamGiven && !isUpperParamGiven;
  const isOnlyLowerGiven = isLowerParamGiven && !isUpperParamGiven;
  const isOnlyUpperGiven = isUpperParamGiven && !isLowerParamGiven;
  let lower = isLowerParamGiven ? parseInt(userParamLower as string, 10) : 0;
  let upper = isUpperParamGiven
    ? parseInt(userParamUpper as string, 10)
    : total;
  if (isOnlyLowerGiven) {
    upper = lower + perPageDefault;
  } else if (isOnlyUpperGiven || areNoParamsGiven) {
    lower = upper - perPageDefault;
  }
  if (upper > total) {
    upper = total;
  }
  if (lower < 0) {
    lower = 0;
  } else if (lower > upper - perPageMinimum) {
    lower = upper - perPageMinimum;
  } else if (upper - lower > perPageMaximum) {
    lower = upper - perPageMaximum;
  }
  return { lower, upper };
};

export interface IBrowseInRangeResult {
  bounds: IBrowseInRangeBounds;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface IBrowseInRangeProps {
  total: number;
  onQueryParamsUpdateRequired: (bounds: IBrowseInRangeBounds) => void;
  onReadyToBrowse: (browseParams: IBrowseInRangeResult) => void;
  perPageDefault: number;
  perPageMinimum: number;
  perPageMaximum: number;
  userParamLower?: string;
  userParamUpper?: string;
}

export const BrowseInRange = ({
  onReadyToBrowse,
  onQueryParamsUpdateRequired,
  perPageDefault,
  perPageMinimum,
  perPageMaximum,
  userParamLower,
  userParamUpper,
  total,
}: IBrowseInRangeProps) => {
  const bounds = calculateBrowseBounds({
    perPageDefault,
    perPageMaximum,
    perPageMinimum,
    total,
    userParamLower,
    userParamUpper,
  });
  const itemsPerPage = bounds.upper - bounds.lower;
  const totalPages = Math.floor(total / itemsPerPage);
  const currentPage = Math.floor(bounds.upper / itemsPerPage);
  const isCorrectPath =
    bounds.lower.toString() === userParamLower &&
    bounds.upper.toString() === userParamUpper;

  useEffect(() => {
    if (!isCorrectPath) {
      onQueryParamsUpdateRequired(bounds);
    } else {
      // If params are correct, trigger search
      onReadyToBrowse({ bounds, currentPage, itemsPerPage, totalPages });
    }
  }, [userParamLower, userParamUpper]);

  return null; // Renderless component
};
