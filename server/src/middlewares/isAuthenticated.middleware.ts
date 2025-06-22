import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../utils/appError.util';
import { HTTPSTATUS } from '../config/http.config';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new UnauthorizedException('Unauthorized. Please log in.');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;

