import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTPSTATUS } from '../config/http.config';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import {
  deleteUserService,
  gelAllDetailsService,
  getCurrentUserService,
  getProfileImageService,
  updateUserDetailServices,
  uploadProfileImageService,
} from '../services/user.service';
import { CvTemplateIdEnum } from '../enums/cvTemplateId.enum';
import { updateSchema } from '../validations/auth.validation';

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { user } = await getCurrentUserService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'User fetched successfully',
      user,
    });
  }
);

export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { user } = await deleteUserService(userId);
  return res.status(HTTPSTATUS.OK).json({
    message: 'User deleted successfully',
    user,
  });
});

export const updateDetailController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateSchema.parse({ ...req.body });
    const { user } = await updateUserDetailServices(userId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'User fetched successfully',
      user,
    });
  }
);

export const uploadProfileImageController: RequestHandler = asyncHandler(
  async (req, res) => {
    try {
      const userId = req.user?._id;
      const file = req.file;
      if (!file || !userId) {
        return res.status(400).json({ message: 'Missing file or userId' });
      }
      const { imageUrl } = await uploadProfileImageService(file, userId);
      return res.status(HTTPSTATUS.OK).json({
        message: 'Profile image uploaded successfully',
        imageUrl,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Upload failed' });
    }
  }
);

export const getProfileImageController: RequestHandler = asyncHandler(
  async (req, res) => {
    const userId = req.user?._id;
    const filePath = await getProfileImageService(userId);
    if (!filePath) {
      return res.status(404).json({ message: 'Profile image not found' });
    }
    return res.sendFile(filePath);
  }
);

export const getAllDetailsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { user, details, educations, experiences, projects, skills } =
      await gelAllDetailsService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'User all details',
      user,
      details,
      educations,
      experiences,
      projects,
      skills,
    });
  }
);

export const getAllCvTemplatesController = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(HTTPSTATUS.OK).json({
      message: 'all templates',
      templates: Object.values(CvTemplateIdEnum),
    });
  }
);

