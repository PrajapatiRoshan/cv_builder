import SkillModel, { SkillDetail } from '../models/skill.model';
import { InternalServerException, NotFoundException } from '../utils/appError.util';

export const addSkillService = async (userId: string, body: SkillDetail) => {
  const skill = new SkillModel({
    userId,
    ...body,
  });
  if (!skill) {
    throw new InternalServerException('Work experience not added');
  }
  await skill.save();

  return { skill };
};

export const getDetailSkillService = async (sId: string) => {
  const skill = await SkillModel.findById(sId);
  if (!skill) {
    throw new NotFoundException('skill not found');
  }
  return { skill };
};

export const getAllSkillsService = async (userId: string) => {
  const skills = await SkillModel.find({ userId });
  if (!skills) {
    throw new NotFoundException('skill not found');
  }
  return { skills };
};

export const updateSkillService = async (sId: string, body: SkillDetail) => {
  const skill = await SkillModel.findByIdAndUpdate(
    sId,
    {
      $set: body,
    },
    { new: true }
  );

  if (!skill) {
    throw new NotFoundException('skill not found');
  }
  return { skill };
};

