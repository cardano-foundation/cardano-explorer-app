export function lovelacesToAda(lovelaces: number) {
  return lovelaces / 1000000;
}

export const lovelacesStringToAdaNumber = (lovelaces: string) =>
  lovelacesToAda(parseInt(lovelaces, 10));
