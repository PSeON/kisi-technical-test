const defaultHost = 'localhost';
export const host = typeof process.env.HOST === 'string' ? process.env.HOST : defaultHost;

const defaultPort = 8080;
export const port =
  typeof process.env.PORT === 'string'
    ? parseInt(process.env.PORT, 10) || defaultPort
    : defaultPort;

// Cache lifetime is 5 seconds
export const cacheLifetime = 5000;

export const articlesPath = '../data-repo/data/articles.json';

export const imagesPath = '../data-repo/images/';

export const imagesPublicPath = '/image';
