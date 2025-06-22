import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { experienceSchemaValid } from '../validations/experience.validation';
import {
  addWorkExpService,
  getAllWorkExpService,
  getDetailWorkExpService,
  updateWorkExpService,
} from '../services/experience.service';
import { HTTPSTATUS } from '../config/http.config';
import { z } from 'zod';

export const addWorkExpController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const body = experienceSchemaValid.parse({ ...req?.body });
  const { workExp } = await addWorkExpService(userId, body);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Work experience added successfully',
    workExp,
  });
});

export const getDetailWorkExpController = asyncHandler(
  async (req: Request, res: Response) => {
    const wexpId = z.string().parse(req.params.id);
    const { workExp } = await getDetailWorkExpService(wexpId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Work experience fetched successfully',
      workExp,
    });
  }
);

export const getAllWorkExpController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const { workExps } = await getAllWorkExpService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'all work experience fetched successfully',
      workExps,
    });
  }
);

export const updateWorkExpController = asyncHandler(
  async (req: Request, res: Response) => {
    const wexpId = z.string().parse(req.params.id);
    const body = experienceSchemaValid.parse({ ...req?.body });
    const { workExp } = await updateWorkExpService(wexpId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'work experience updated successfully',
      workExp,
    });
  }
);

