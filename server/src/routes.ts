import { Application } from 'express';
import { apiImages } from './controllers/images';
import { apiControllerWrapper } from './lib/controllerWrapper';
import { apiUploadImage, uploadMiddleware } from './controllers/uploadImage';
import { apiClearImages } from './controllers/clearImages';

export function setupRoutes(app: Application) {
  app.get('/images', apiControllerWrapper(apiImages));

  app.post('/uploadImage', uploadMiddleware, apiControllerWrapper(apiUploadImage));

  app.post('/clearImages', apiControllerWrapper(apiClearImages));
}
