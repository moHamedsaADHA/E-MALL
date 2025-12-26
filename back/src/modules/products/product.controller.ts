import { Request, Response, NextFunction } from 'express';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: 'createProduct - TODO' });
};

export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'listProducts - TODO' });
};
