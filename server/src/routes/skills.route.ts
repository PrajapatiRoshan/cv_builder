import { Router } from 'express';

const skillRoute = Router();

skillRoute.post('/addSkill');
skillRoute.get('/detailSkill/:id/get');
skillRoute.get('/allSkills');
skillRoute.put('/updateSkill/:id/update');

export default skillRoute;

