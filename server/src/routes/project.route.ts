import { Router } from 'express';
import {
  addProjectController,
  getAllProjectController,
  getDetailProjectController,
  updateProjectController,
} from '../controller/project.controller';

const projectRoute = Router();

projectRoute.post('/addProject', addProjectController);
projectRoute.get('/detailProject/:id/get', getDetailProjectController);
projectRoute.get('/allProjects', getAllProjectController);
projectRoute.put('/updateProject/:id/update', updateProjectController);

export default projectRoute;

