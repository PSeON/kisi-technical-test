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

const server = app.listen(port, host, () => {
  console.log(`App is listening at http://${host}:${port}/`);
});

// Support gracefull stop
const signals: Record<string, number> = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

function shutdown(signal: string, value: number) {
  server.close(() => {
    console.log(`Server stopped by ${signal} with value ${value}`);
    process.exit(128 + value);
  });
}

for (const signal in signals) {
  process.on(signal, () => {
    console.log(`Received a ${signal} signal`);
    shutdown(signal, signals[signal]);
  });
}
