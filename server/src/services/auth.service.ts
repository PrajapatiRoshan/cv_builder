import mongoose from 'mongoose';
import AccountModel from '../models/account.model';
import UserModel from '../models/user.model';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '../utils/appError.util';
import { ProviderEnum } from '../enums/accounts-provides.enum';

export const registerUserService = async (body: {
  email: string;
  name: string;
  password?: string;
}) => {
  const { email, name, password } = body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = new UserModel({
      email,
      name,
      password,
    });
    await user.save({ session });

    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: email,
    });
    await account.save({ session });

    await user.save({ session });

    await session.commitTransaction();
    session.endSession();
    return { userId: user._id };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { provider, displayName, providerId, picture, email } = data;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null,
      });
      await user.save({ session });

      const account = new AccountModel({
        userId: user._id,
        provider,
        providerId,
      });
      await account.save({ session });

      await user.save({ session });
    }

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

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    throw new BadRequestException('Invalid email or password');
  }

  const user = await UserModel.findById(account.userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  return user.omitPassword();
};

export const findUserById = async (userId: string) => {
  const user = await UserModel.findById(userId, {
    password: false,
  });
  return user || null;
};

