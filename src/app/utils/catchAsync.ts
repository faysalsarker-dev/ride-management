import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: AsyncFn): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
