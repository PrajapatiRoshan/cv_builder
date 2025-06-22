import { Router } from 'express';
import {
  addSkillController,
  getAllSkillsController,
  getDetailSkillController,
  updateSkillController,
} from '../controller/skill.controller';

const skillRoute = Router();

skillRoute.post('/addSkill', addSkillController);
skillRoute.get('/detailSkill/:id/get', getDetailSkillController);
skillRoute.get('/allSkills', getAllSkillsController);
skillRoute.put('/updateSkill/:id/update', updateSkillController);

export default skillRoute;

