import ExperienceModel, { WorkExpDetail } from '../models/experience.model';
import { InternalServerException, NotFoundException } from '../utils/appError.util';

export const addWorkExpService = async (userId: string, body: WorkExpDetail) => {
  const workExp = new ExperienceModel({ userId, ...body });
  if (!workExp) {
    throw new InternalServerException('Work experience not added');
  }

  await workExp.save();

  return { workExp };
};

export const getDetailWorkExpService = async (wexpId: string) => {
  const workExp = await ExperienceModel.findById(wexpId);
  if (!workExp) {
    throw new NotFoundException('work experience not found');
  }

  return { workExp };
};

export const getAllWorkExpService = async (userId: string) => {
  const workExps = await ExperienceModel.find({ userId });
  if (!workExps) {
    throw new NotFoundException('work experience not found');
  }

  return { workExps };
};

export const updateWorkExpService = async (wexpId: string, body: WorkExpDetail) => {
  const workExp = await ExperienceModel.findByIdAndUpdate(
    wexpId,
    { $set: body },
    { new: true }
  );

  if (!workExp) {
    throw new NotFoundException('work experience not found');
  }

  return { workExp };
};

