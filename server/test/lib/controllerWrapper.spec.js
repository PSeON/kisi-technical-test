import { apiControllerWrapper } from '../../src/lib/controllerWrapper';

test('apiControllerWrapper calls a controller', async () => {
  const req = {};
  const res = {
    send: jest.fn(),
    setHeader: jest.fn(),
  };
  const response = { data: 'data' };
  const controller = jest.fn().mockReturnValue(response);
  const fn = apiControllerWrapper(controller);

  await fn(req, res);

  expect(controller).toHaveBeenCalledWith(req, res);
  expect(res.send).toHaveBeenCalledWith(response);
});

test('apiControllerWrapper handles an error', async () => {
  const req = {};
  const res = {
    send: jest.fn(),
    setHeader: jest.fn(),
  };
  const controller = jest.fn().mockImplementation(() => {
    throw new Error('Error');
  });
  const fn = apiControllerWrapper(controller);

  await fn(req, res);

  expect(controller).toHaveBeenCalledWith(req, res);
  expect(res.statusCode).toBe(500);
});
