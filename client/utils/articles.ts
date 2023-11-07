import { type ImagesApiResponse } from 'shared';

export function useArticles() {
  return useLazyFetch<ImagesApiResponse>('/images');
}
