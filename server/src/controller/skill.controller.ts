import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { skillSchemaValid } from '../validations/skill.validation';
import { HTTPSTATUS } from '../config/http.config';
import {
  addSkillService,
  getAllSkillsService,
  getDetailSkillService,
  updateSkillService,
} from '../services/skill.service';

export const addSkillController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const body = skillSchemaValid.parse({ ...req.body });
  const { skill } = await addSkillService(userId, body);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Skill add successfully',
    skill,
  });
});

export const getDetailSkillController = asyncHandler(
  async (req: Request, res: Response) => {
    const sId = req.params.id;
    const { skill } = await getDetailSkillService(sId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Skill fetched successfully',
      skill,
    });
  }
);

export const getAllSkillsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const { skills } = await getAllSkillsService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'All Skill fetched successfully',
      skills,
    });
  }
);

export const updateSkillController = asyncHandler(async (req: Request, res: Response) => {
  const sId = req.params.id;
  const body = skillSchemaValid.parse({ ...req.body });
  const { skill } = await updateSkillService(sId, body);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Skill updated successfully',
    skill,
  });
});

