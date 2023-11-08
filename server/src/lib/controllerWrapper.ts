import { Request, Response } from 'express';

type ControllerFn<T> = (req: Request, res: Response) => Promise<T> | T;

export function apiControllerWrapper<T>(controllerFn: ControllerFn<T>) {
  return async (req: Request, res: Response) => {
    try {
      const result = await controllerFn(req, res);
      res.send(result);
    } catch (e) {
      process.stderr.write(e instanceof Error ? e.message : 'Unknown error');
      process.stderr.write('\n');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send('Unexpected API error');
    }
  };
}
