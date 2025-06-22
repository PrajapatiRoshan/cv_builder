import { ErrorCodeEnum } from '../enums/error-codes.enum';
import UserDetailModel, { UserDetailsInterface } from '../models/userDetail.model';
import { NotFoundException, UnauthorizedException } from '../utils/appError.util';
import { getUpdatedFields } from '../utils/update-object.util';

export const addUserDetailService = async (
  userId: string,
  body: UserDetailsInterface
) => {
  try {
    const detail = new UserDetailModel({
      userId,
      ...body,
    });
    await detail.save();
    return { detail };
  } catch (error) {
    throw error;
  }
};

export const getUserDetailService = async (userId: string) => {
  const detail = await UserDetailModel.findOne({ userId });

  if (!detail) {
    throw new NotFoundException('Detail not found');
  }

  return { detail };
};

export const updateUserDetailServices = async (
  userId: string,
  body: Partial<UserDetailsInterface>
) => {
  const detail = await UserDetailModel.findOne({ userId });

  if (!detail) {
    throw new NotFoundException('Detail not found');
  }

  const { updates, change } = getUpdatedFields(detail.toObject(), body);

  if (change) {
    await UserDetailModel.updateOne({ userId }, { $set: updates });
  }

  const updatedDetail = await UserDetailModel.findOne({ userId });

  return { detail: updatedDetail };
};

