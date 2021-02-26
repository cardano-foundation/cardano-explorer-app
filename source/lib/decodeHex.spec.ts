import { decodeHex } from './decodeHex';

describe('Decode hex to utf-8', () => {
  it('should return BerryPink', () => {
    const result = decodeHex('426572727950696e6b');
    expect(result).toEqual('BerryPink');
  });

  it('should return BerryNFT141', () => {
    const result = decodeHex('42657272794e4654313431');
    expect(result).toEqual('BerryNFT141');
  });
  it('should return svårt', () => {
    const result = decodeHex('7376c3a57274');
    expect(result).toEqual('svårt');
  });

  it('should return not encoded', () => {
    const result = decodeHex('not encoded');
    expect(result).toEqual('not encoded');
  });
});
