export class AppError extends Error {
  status: number;
  isOperational: boolean;
  constructor(message: string, status = 500, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
