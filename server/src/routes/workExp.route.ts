import { Router } from 'express';

const workExpRoute = Router();

workExpRoute.post('/addWorkExp');
workExpRoute.get('/detailWorkExp/:id/get');
workExpRoute.get('/allWorkExps');
workExpRoute.put('/updateWorkExp/:id/update');

export default workExpRoute;

