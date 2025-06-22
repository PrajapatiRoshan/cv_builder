import { Router } from 'express';
import {
  addDetailContoller,
  getUserDetailController,
  updateUserDetailController,
} from '../controller/userDetail.controller';

const userDetailRoute = Router();

userDetailRoute.post('/addDetail', addDetailContoller);
userDetailRoute.get('/detail', getUserDetailController);
userDetailRoute.put('/updateDetail', updateUserDetailController);

export default userDetailRoute;

