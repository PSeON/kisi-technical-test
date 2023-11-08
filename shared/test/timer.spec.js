import { delay } from '../src/timer';

test('delay fn does a delay', async () => {
  const time1 = performance.now();
  await delay(500);
  const time2 = performance.now();

  expect(time2 - time1).toBeLessThan(600);
  expect(time2 - time1).toBeGreaterThan(500);
});
