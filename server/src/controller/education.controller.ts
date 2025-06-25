import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { educationSchemaValid } from '../validations/education.validation';
import { HTTPSTATUS } from '../config/http.config';
import {
  addEducationService,
  getAllEducationServices,
  getDetailEducationService,
  updateEducationService,
} from '../services/education.service';
import { z } from 'zod';

export const addEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const body = educationSchemaValid.parse({ ...req?.body });
    const { education } = await addEducationService(userId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Education Added successfully',
      education,
    });
  }
);

export const getDetailEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const eduId = z.string().parse(req.params.id);
    const { education } = await getDetailEducationService(eduId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Education Added successfully',
      education,
    });
  }
);

export const getAllEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const { educations } = await getAllEducationServices(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Education Added successfully',
      educations,
    });
  }
);

export const updateEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const eduId = z.string().parse(req.params.id);
    const body = educationSchemaValid.parse({ ...req?.body });
    const { education } = await updateEducationService(eduId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Education updated successfully',
      education,
    });
  }
);

