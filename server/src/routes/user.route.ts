import { Router } from 'express';
import multer from 'multer';
import {
  deleteUserController,
  getAllCvTemplatesController,
  getAllDetailsController,
  getCurrentUserController,
  getProfileImageController,
  uploadProfileImageController,
} from '../controller/user.controller';

const userRoute = Router();

const upload = multer({ storage: multer.memoryStorage() });

userRoute.get('/current', getCurrentUserController);

userRoute.delete('/delete', deleteUserController);

userRoute.post(
  '/uploadProfileImg',
  upload.single('profileImage'),
  uploadProfileImageController
);

userRoute.get('/profileImg', getProfileImageController);

userRoute.get('/allDetails', getAllDetailsController);

userRoute.get('/allCvTemplates', getAllCvTemplatesController);

export default userRoute;

