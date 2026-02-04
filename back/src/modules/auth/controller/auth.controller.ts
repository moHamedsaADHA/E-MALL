import { Request, Response, NextFunction } from 'express';

// TODO: Implement controllers that delegate to auth.service

export const register = async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: 'register - TODO' });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'login - TODO' });
};
