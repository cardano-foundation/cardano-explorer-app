export const decodeHex = (hex: string) => {
  try {
    return decodeURIComponent(
      hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')
    );
  } catch {
    return hex;
  }
};
