import fs from 'fs/promises';
import path from 'path';
import { cacheLifetime, imagesPath, imagesPublicPath } from '../config';
import { cache } from '../services';
import { createUniqueCacheKey } from './cache';

const imagesCacheKey = createUniqueCacheKey();

export function localImagePathToPublic(localImagePath: string): string {
  return path.posix.join(imagesPublicPath, localImagePath);
}

export function clearImagesCache() {
  cache.delete(imagesCacheKey);
}

export async function getImagesPaths(): Promise<string[]> {
  const cachedImages = cache.get(imagesCacheKey) as string[];
  if (cachedImages) {
    return cachedImages;
  }
  const images = await fs.readdir(imagesPath);

  const imagePublicPaths = images.map(image => localImagePathToPublic(image));

  // We want images order to be consistent
  imagePublicPaths.sort();

  cache.set(imagesCacheKey, imagePublicPaths, cacheLifetime);
  return imagePublicPaths;
}

export async function getAvailableFileName(ext: string) {
  for (let i = 0; i < 1000; i++) {
    const images = await fs.readdir(imagesPath);
    const id = `${images.length}`.padStart(5, '0');
    const possibleName = `image9${id}${ext}`;
    try {
      const stat = await fs.stat(path.resolve(imagesPath, possibleName));
    } catch (e: any) {
      if (e && e.code === 'ENOENT') {
        return possibleName;
      }
    }
  }
  throw new Error("Can't find available file name");
}

export async function clearUploadedImages() {
  const images = await fs.readdir(imagesPath);
  await Promise.all(
    images
      .filter(image => image.startsWith('image90'))
      .map(image => fs.rm(path.resolve(imagesPath, image))),
  );
  clearImagesCache();
}
