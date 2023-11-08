import { getArticles } from '../../src/lib/articles';

test('getArticles returns a valid list of articles', async () => {
  const result = await getArticles();

  expect(result[0]).toEqual({
    description: 'Learn why physical access security is crucial for protecting people and assets.',
    title: 'The Importance of Physical Access Security',
  });
  expect(result[result.length - 1]).toEqual({
    description: 'Get tips on securing server rooms to protect your IT infrastructure and data.',
    title: 'Securing Server Rooms',
  });
});
