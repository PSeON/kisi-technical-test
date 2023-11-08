import { apiImages } from '../../src/controllers/images';

test('apiImages returns a valid list of articles', async () => {
  const req = {};
  const res = {};
  const result = await apiImages(req, res);

  expect(result.articles[0]).toEqual({
    article: {
      description:
        'Learn why physical access security is crucial for protecting people and assets.',
      title: 'The Importance of Physical Access Security',
    },
    image: '/image/image.png',
  });
  expect(result.articles[6]).toEqual({
    article: {
      description:
        'Learn about the physical security measures you can take to protect your IT infrastructure.',
      title: 'Securing IT Infrastructure',
    },
    image: '/image/image6.png',
  });
});
