import { Document, model, Schema } from 'mongoose';
import { compareValue, hashValue } from '../utils/bcrypt.util';
import { CvTemplateIdEnum, cvTemplateIdEnumType } from '../enums/cvTemplateId.enum';

export interface UserImgnCV {
  name: string;
  email: string;
  profilePicture?: string;
  cvTemplateId?: cvTemplateIdEnumType;
  password?: string;
}

export interface UserDocument extends Document, UserImgnCV {
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: true,
    },
    cvTemplateId: {
      type: String,
      enum: Object.values(CvTemplateIdEnum),
      required: true,
      default: CvTemplateIdEnum.ONEPAGEFORMATE,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }
  next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, 'password'> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;

