import { describe, it, expect } from 'vitest';
import { getAsset, getAllAssets } from '../../src/lib/assets';

describe('Asset Pipeline', () => {
  it('should list all assets', () => {
    const assets = getAllAssets();
    expect(assets.length).toBeGreaterThan(0);
  });

  it('should correctly retrieve an asset by id', () => {
    const asset = getAsset('coconut-premium');
    expect(asset.id).toBe('coconut-premium');
    expect(asset.src).toBe('/assets/products/coconut-premium.webp');
    expect(asset.width).toBe(560);
    expect(asset.height).toBe(705);
    expect(asset.alt.en).toBeDefined();
    expect(asset.alt.bn).toBeDefined();
    expect(asset.blurDataURL).toBeDefined();
  });

  it('should throw an error for unknown asset id', () => {
    // We are deliberately passing an invalid id to test the runtime throw.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => getAsset('unknown-asset' as any)).toThrow('Asset not found: unknown-asset');
  });
});
