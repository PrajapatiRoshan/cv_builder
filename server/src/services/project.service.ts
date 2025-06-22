import ProjectModel, { ProjectDetail } from '../models/project.model';
import { InternalServerException, NotFoundException } from '../utils/appError.util';

export const addProjectService = async (userId: string, body: ProjectDetail) => {
  const project = new ProjectModel({ userId, ...body });
  if (!project) {
    throw new InternalServerException('project not added');
  }
  await project.save();

  return { project };
};

export const getDetailProjectService = async (pId: string) => {
  const project = await ProjectModel.findById(pId);
  if (!project) {
    throw new NotFoundException('project not found');
  }

  return { project };
};

export const getAllProjectService = async (userId: string) => {
  const projects = await ProjectModel.find({ userId });
  if (!projects) {
    throw new NotFoundException('project not found');
  }

  return { projects };
};

export const updateProjectService = async (pId: string, body: ProjectDetail) => {
  const project = await ProjectModel.findByIdAndUpdate(
    pId,
    { $set: body },
    { new: true }
  );

  if (!project) {
    throw new NotFoundException('project not found');
  }

  return { project };
};

