import fs from 'fs/promises';
import { articlesPath, cacheLifetime } from '../config';
import { cache } from '../services';
import { createUniqueCacheKey } from './cache';
import { Article } from 'shared';

const articlesCacheKey = createUniqueCacheKey();

export async function getArticles(): Promise<Article[]> {
  const cachedArticles = cache.get(articlesCacheKey) as Article[];
  if (cachedArticles) {
    return cachedArticles;
  }
  const articlesString = await fs.readFile(articlesPath, 'utf-8');
  const articles = JSON.parse(articlesString);
  cache.set(articlesCacheKey, articles, cacheLifetime);
  return articles;
}
