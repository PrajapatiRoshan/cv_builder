import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { config } from '../config/app.config';
import { registerSchema } from '../validations/auth.validation';
import { HTTPSTATUS } from '../config/http.config';
import { registerUserService } from '../services/auth.service';
import passport from 'passport';
import { signJwtToken } from '../utils/jwt.util';

export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
  const jwt = req.jwt;
  if (!jwt) {
    return res.redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
  }
  return res.redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=success`);
});

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });
    await registerUserService(body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: 'User registered successfully',
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'local',
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || 'Invalid email and password',
          });
        }
        const access_token = signJwtToken({ userId: user._id });
        return res.status(HTTPSTATUS.OK).json({
          message: 'Logged in successfully',
          access_token,
          user,
        });
      }
    )(req, res, next);
  }
);

export const logOutController = asyncHandler(async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Logout failed',
        error: 'Failed to logout',
      });
    }
  });
  req.session = null;
  return res.status(HTTPSTATUS.OK).json({
    message: 'Logged out successfully',
  });
});

