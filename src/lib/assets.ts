import manifest from '../../public/assets/asset-manifest.json';

export type AssetId = typeof manifest.assets[number]['id'];

export interface AssetItem {
  id: AssetId;
  kind: string;
  file: string;
  width: number;
  height: number;
  bytes: number;
  quality: string;
  alt: {
    en: string;
    bn: string;
  };
  source: string;
  notes: string;
}

export function getAsset(id: AssetId): AssetItem & { src: string; blurDataURL?: string } {
  const asset = manifest.assets.find(a => a.id === id);
  if (!asset) {
    throw new Error(`Asset not found: ${id}`);
  }
  
  return {
    ...asset,
    src: `/assets/${asset.file}`,
    // A generic transparent pixel or skip for now
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
  };
}

export function getAllAssets(): AssetItem[] {
  return manifest.assets;
}
