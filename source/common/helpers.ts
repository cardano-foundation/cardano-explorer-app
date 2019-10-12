import { SCREEN_BREAKPOINTS } from './constants';

export const shrinkAddress = (address: string) => {
  if (address.length <= 34) {
    return address;
  }
  return `${address.substring(0, 17)}...${address.substring(
    address.length - 17
  )}`;
};

export const isMobileScreen = () => screen.width < SCREEN_BREAKPOINTS.XS;
