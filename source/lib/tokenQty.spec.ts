import { tokenQty } from './tokenQty';

const stubAssetBase = {
  assetName: 'someAssetName',
  fingerprint: 'someFingerprint',
  policyId: 'somePolicyId'
}

describe('tokenQty', () => {
  it('should return the qty of the provided token as-is when the asset has no decimals defined', () => {
    const result = tokenQty({
      asset: {
        ...stubAssetBase,
      },
      quantity: '123456789'
    });
    expect(result).toEqual('123456789');
  });
  it('should return the adjusted value of the token quantity using the decimals when present', () => {
    const result = tokenQty({
      asset: {
        ...stubAssetBase,
        decimals: 4
      },
      quantity: '123456789'
    });
    expect(result).toEqual('12345.6789');
  });
});
