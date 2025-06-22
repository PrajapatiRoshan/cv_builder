import EducationModel, { EducationDetails } from '../models/education.model';
import { InternalServerException, NotFoundException } from '../utils/appError.util';

export const addEducationService = async (userId: string, body: EducationDetails) => {
  const education = new EducationModel({ userId, ...body });

  if (!education) {
    throw new InternalServerException('Education not added successfully');
  }

  await education.save();

  return { education };
};

export const getDetailEducationService = async (eduId: string) => {
  const education = await EducationModel.findById(eduId);
  if (!education) {
    throw new NotFoundException('Education not found');
  }

  return { education };
};

export const getAllEducationServices = async (userId: string) => {
  const educations = await EducationModel.find({ userId });
  if (!educations) {
    throw new NotFoundException('Education not found');
  }

  return { educations };
};

export const updateEducationService = async (
  eduId: string,
  body: Partial<EducationDetails>
) => {
  const education = await EducationModel.findByIdAndUpdate(
    eduId,
    { $set: body },
    { new: true }
  );

  if (!education) {
    throw new NotFoundException('Education not found');
  }

  return { education };
};

