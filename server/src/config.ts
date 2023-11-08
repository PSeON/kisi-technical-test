const defaultHost = 'localhost';
export const host = typeof process.env.HOST === 'string' ? process.env.HOST : defaultHost;

const defaultPort = 8080;
export const port =
  typeof process.env.PORT === 'string'
    ? parseInt(process.env.PORT, 10) || defaultPort
    : defaultPort;

// Cache lifetime is 5 seconds
export const cacheLifetime = 5000;

export const defaultDataRepoPath = '../data-repo';
export const dataRepoPath =
  typeof process.env.DATA_REPO === 'string' ? process.env.DATA_REPO : defaultDataRepoPath;

export const articlesPath = `${dataRepoPath}/data/articles.json`;

export const imagesPath = `${dataRepoPath}/images/`;

export const imagesPublicPath = '/image';
