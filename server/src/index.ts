import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { config } from './config/app.config';
import { asyncHandler } from './middlewares/asyncHandler.middleware';
import { HTTPSTATUS } from './config/http.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import connectToDataBase from './config/database.config';
import { passportAuthenticationJWT } from './config/passport.config';
import authRoutes from './routes/auth.route';
import userRoute from './routes/user.route';
import userDetailRoute from './routes/userDetail.route';
import educationRoute from './routes/educations.route';
import workExpRoute from './routes/workExp.route';
import skillRoute from './routes/skills.route';
import projectRoute from './routes/project.route';
import path from 'path';

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({ message: 'Backend Running' }).send('working....');
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(`${BASE_PATH}/user`, passportAuthenticationJWT, userRoute);

app.use(`${BASE_PATH}/userDetails`, passportAuthenticationJWT, userDetailRoute);

app.use(`${BASE_PATH}/educations`, passportAuthenticationJWT, educationRoute);

app.use(`${BASE_PATH}/workExps`, passportAuthenticationJWT, workExpRoute);

app.use(`${BASE_PATH}/skills`, passportAuthenticationJWT, skillRoute);

app.use(`${BASE_PATH}/projects`, passportAuthenticationJWT, projectRoute);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`);
  await connectToDataBase();
});

