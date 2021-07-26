import { Asset } from '../../../../generated/typings/graphql-schema';
import { IAsset } from '../../transactions/types';

export const assetTransformer = (
  asset: Asset
): IAsset => {
  return {
    ...asset,
    assetName: asset.assetName as string,
    decimals: asset.decimals ? asset.decimals: undefined,
    description: asset.description ? asset.description as string : undefined,
    fingerprint: asset.fingerprint,
    name: asset.name ? asset.name as string : undefined,
    ticker: asset.ticker ? asset.ticker as string : undefined,
  }
}
