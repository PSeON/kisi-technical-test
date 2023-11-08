import { localImagePathToPublic, getImagesPaths, getAvailableFileName } from '../../src/lib/images';

test('localImagePathToPublic returns a valid path', async () => {
  const result = localImagePathToPublic('image.png');

  expect(result).toBe('/image/image.png');
});

test('getImagesPaths returns a valid files list', async () => {
  const result = await getImagesPaths();

  expect(result).toEqual([
    '/image/image.png',
    '/image/image1.png',
    '/image/image2.png',
    '/image/image3.png',
    '/image/image4.png',
    '/image/image5.png',
    '/image/image6.png',
  ]);
});

test('getAvailableFileName returns a valid file name', async () => {
  const result = await getAvailableFileName('.png');

  expect(result).toBe('image900007.png');
});
