import { Request, Response } from 'express';
import { clearUploadedImages } from '../lib/images';

export async function apiClearImages(req: Request, res: Response) {
  await clearUploadedImages();
  return { success: true };
}
