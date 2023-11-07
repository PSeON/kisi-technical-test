import { Request, Response } from 'express';
import multer from 'multer';
import { imagesPath } from '../config';
import path from 'path';
import { clearImagesCache, getAvailableFileName } from '../lib/images';

export const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: imagesPath,
    filename: async (req, file, callback) => {
      const extname = path.extname(file.originalname);
      if (extname.length === 0 || extname.length > 10) {
        callback(new Error('Incorrect file name'), '');
        return;
      }
      const fileName = await getAvailableFileName(extname);
      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
}).single('image');

export async function apiUploadImage(req: Request, res: Response) {
  clearImagesCache();
  return { success: true };
}
