import express from 'express';
import { setupRoutes } from './routes';
import { host, imagesPath, imagesPublicPath, port } from './config';

const app = express();

setupRoutes(app);

// Ideally this functionality must be done by nginx or CDN. But to keep it simple I'm setting up
// it here.
app.use(imagesPublicPath, express.static(imagesPath));

// Logging unhandled requests, for debugging purposes.
app.use((req, res, next) => {
  process.stderr.write(`Path not found: ${req.url}\n`);
  next();
});

app.listen(port, host, () => {
  console.log(`App is listening at http://${host}:${port}/`);
});
