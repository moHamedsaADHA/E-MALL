import { Request, Response, NextFunction } from 'express';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'getProfile - TODO' });
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'updateProfile - TODO' });
};
