import xss from "xss";
import { Request, Response, NextFunction } from "express";

const xssMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const clean = (obj: any) => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = xss(obj[key]);
      } else {
        clean(obj[key]);
      }
    }
  };

  clean(req.body);
  clean(req.query);
  clean(req.params);

  next();
};

export default xssMiddleware;
