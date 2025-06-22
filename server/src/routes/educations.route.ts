import { Router } from 'express';
import {
  addEducationController,
  getAllEducationController,
  getDetailEducationController,
  updateEducationController,
} from '../controller/education.controller';

const educationRoute = Router();

educationRoute.post('/addEducation', addEducationController);
educationRoute.get('/detailEducation/:id/get', getDetailEducationController);
educationRoute.get('/allEducations', getAllEducationController);
educationRoute.put('/updateEducation/:id/update', updateEducationController);

export default educationRoute;

