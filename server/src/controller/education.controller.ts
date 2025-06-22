import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { educationSchemaValid } from '../validations/education.validation';
import { HTTPSTATUS } from '../config/http.config';

export const addEducationController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const body = educationSchemaValid.parse({ ...req?.body });
    // const {education}= await addEducationService(userId,body);
    return res.status(HTTPSTATUS.OK);
  }
);
