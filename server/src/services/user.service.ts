import path from 'path';
import fs from 'fs';
import UserModel, { UserDocument, UserImgnCV } from '../models/user.model';
import { BadRequestException, NotFoundException } from '../utils/appError.util';
import { startSession } from 'mongoose';
import UserDetailModel, { UserDetailDocument } from '../models/userDetail.model';
import EducationModel, { EducationDocument } from '../models/education.model';
import ExperienceModel, { ExperienceDocument } from '../models/experience.model';
import ProjectModel, { ProjectDocument } from '../models/project.model';
import SkillModel, { SkillDocument } from '../models/skill.model';
import AccountModel, { AccountDocument } from '../models/account.model';

type FullUserData = {
  user: UserDocument | null;
  details: UserDetailDocument | null;
  educations: EducationDocument[];
  experiences: ExperienceDocument[];
  projects: ProjectDocument[];
  skills: SkillDocument[];
};

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password');
  if (!user) {
    throw new BadRequestException('User not found');
  }
  return { user };
};

export const deleteUserService = async (userId: string) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findById(userId).session(session);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userAcc = await AccountModel.findOneAndDelete({ userId }).session(session);
    if (!userAcc) {
      throw new NotFoundException('User details not found');
    }

    const userDetail = await UserDetailModel.findOneAndDelete({ userId }).session(
      session
    );
    if (!userDetail) {
      throw new NotFoundException('User details not found');
    }

    await EducationModel.deleteMany({ userId }).session(session);
    await ExperienceModel.deleteMany({ userId }).session(session);
    await ProjectModel.deleteMany({ userId }).session(session);
    await SkillModel.deleteMany({ userId }).session(session);

    await user.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};

export const updateUserDetailServices = async (userId: string, body: UserImgnCV) => {
  const user = await UserModel.findByIdAndUpdate(userId, { $set: body }, { new: true });

  if (!user) {
    throw new BadRequestException('User not found');
  }
  return { user };
};

export const uploadProfileImageService = async (
  file: Express.Multer.File,
  userId: string
) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  const ext = file.originalname.split('.').pop();
  const filename = `${userId}.${ext}`;
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, file.buffer);
  const imageUrl = `/uploads/${filename}`;
  return { imageUrl };
};

export const getProfileImageService = async (userId: string): Promise<string | null> => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const possibleExts = ['jpg', 'jpeg', 'png', 'webp'];
  for (const ext of possibleExts) {
    const filePath = path.join(uploadsDir, `${userId}.${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
};

export const gelAllDetailsService = async (userId: string): Promise<FullUserData> => {
  const [user, details, educations, experiences, projects, skills] = await Promise.all([
    UserModel.findById(userId).select('-password'),
    UserDetailModel.findOne({ userId }),
    EducationModel.find({ userId }),
    ExperienceModel.find({ userId }),
    ProjectModel.find({ userId }),
    SkillModel.find({ userId }),
  ]);

  return {
    user,
    details,
    educations,
    experiences,
    projects,
    skills,
  };
};

