import { Request, Response } from 'express';
import { getImagesPaths } from '../lib/images';
import { getArticles } from '../lib/articles';
import { ImagesApiResponse } from 'shared';

export async function apiImages(req: Request, res: Response): Promise<ImagesApiResponse> {
  const [sourceImages, sourceArticles] = await Promise.all([getImagesPaths(), getArticles()]);
  const articles = sourceImages.map((image, index) => ({
    image,
    article: sourceArticles[index],
  }));
  return { articles };
}
