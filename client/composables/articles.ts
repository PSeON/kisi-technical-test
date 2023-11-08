import { type ImagesApiResponse } from 'shared';
import { createPromiseObject } from '~/utils/promiseObject';

export function fetchArticles() {
  return useLazyFetch<ImagesApiResponse>('/images', {
    retry: 0,
  });
}

export function uploadImage(
  formData: FormData,
  progressCallback: (progress: number | null) => void,
): Promise<void> {
  const promise = createPromiseObject();
  const request = new XMLHttpRequest();
  request.addEventListener('error', () => {
    promise.reject(new Error('Network error'));
  });
  request.addEventListener('load', () => {
    if (request.status === 200) {
      promise.resolve();
    } else {
      promise.reject(new Error('Network error'));
    }
  });
  request.upload.addEventListener('progress', event => {
    progressCallback(event.lengthComputable ? event.loaded / event.total : null);
  });
  request.open('POST', '/uploadImage');
  request.send(formData);
  return promise;
}

export async function clearUploadedImages() {
  await $fetch('/clearImages', { method: 'post' });
}
