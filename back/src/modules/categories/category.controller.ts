import { Request, Response, NextFunction } from 'express';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: 'createCategory - TODO' });
};

export const listCategories = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'listCategories - TODO' });
};
