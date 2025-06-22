import { Router } from 'express';

const educationRoute = Router();

educationRoute.post('/addEducation');
educationRoute.get('/detailEducation/:id/get');
educationRoute.get('/allEducations');
educationRoute.put('/updateEducation/:id/update');

export default educationRoute;

