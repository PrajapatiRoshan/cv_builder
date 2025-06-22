import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { projectSchemaValid } from '../validations/project.validation';
import { HTTPSTATUS } from '../config/http.config';
import {
  addProjectService,
  getAllProjectService,
  getDetailProjectService,
  updateProjectService,
} from '../services/project.service';

export const addProjectController = asyncHandler(async (req: Request, res: Response) => {
  const uyserId = req?.user?._id;
  const body = projectSchemaValid.parse({ ...req.body });
  const { project } = await addProjectService(uyserId, body);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Project added successfully',
    project,
  });
});

export const getDetailProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const pId = req.params.id;
    const { project } = await getDetailProjectService(pId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'proejct fetched successfully',
      project,
    });
  }
);

export const getAllProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id;
    const { projects } = await getAllProjectService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: 'All project fetched successfully',
      projects,
    });
  }
);

export const updateProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const pId = req.params.id;
    const body = projectSchemaValid.parse({ ...req.body });
    const { project } = await updateProjectService(pId, body);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Project updated successfully',
      project,
    });
  }
);

