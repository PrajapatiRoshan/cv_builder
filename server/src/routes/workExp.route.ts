import { Router } from 'express';
import {
  addWorkExpController,
  getAllWorkExpController,
  getDetailWorkExpController,
  updateWorkExpController,
} from '../controller/experience.controller';

const workExpRoute = Router();

workExpRoute.post('/addWorkExp', addWorkExpController);
workExpRoute.get('/detailWorkExp/:id/get', getDetailWorkExpController);
workExpRoute.get('/allWorkExps', getAllWorkExpController);
workExpRoute.put('/updateWorkExp/:id/update', updateWorkExpController);

export default workExpRoute;

