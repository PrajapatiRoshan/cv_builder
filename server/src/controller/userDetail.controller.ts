import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { NextFunction, Request, Response } from 'express';
import { userDetailSchemaValid } from '../validations/userDetail.validation';
import {
  addUserDetailService,
  getUserDetailService,
  updateUserDetailServices,
} from '../services/userDetail.service';
import { HTTPSTATUS } from '../config/http.config';

export const addDetailContoller = asyncHandler(async (req: Request, res: Response) => {
  const body = userDetailSchemaValid.parse({ ...req.body });
  const userId = req.user?._id;
  const { detail } = await addUserDetailService(userId, body);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Details added successfully',
    detail,
  });
});

export const getUserDetailController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { detail } = await getUserDetailService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Details fetch successfully',
      detail,
    });
  }
);

export const updateUserDetailController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = userDetailSchemaValid.partial().parse({ ...req.body });
    const { detail } = await updateUserDetailServices(userId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Details updated successfully',
      detail,
    });
  }
);

