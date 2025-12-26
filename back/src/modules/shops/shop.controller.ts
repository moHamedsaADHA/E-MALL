import { Request, Response, NextFunction } from 'express';

export const createShop = async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: 'createShop - TODO' });
};

export const getShop = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'getShop - TODO' });
};
