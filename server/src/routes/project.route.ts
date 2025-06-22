import { Router } from 'express';

const projectRoute = Router();

projectRoute.post('/addProject');
projectRoute.get('/detailProject/:id/get');
projectRoute.get('/allProjects');
projectRoute.put('/updateProject/:id/update');

export default projectRoute;

