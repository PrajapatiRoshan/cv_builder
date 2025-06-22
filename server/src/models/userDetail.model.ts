import { Schema, Document, model, Types } from 'mongoose';

export interface UserDetailsInterface {
  countryCode: number;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: Number;
  dob: Date;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  summary: string;
}

export interface UserDetailDocument extends UserDetailsInterface, Document {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const useDetailSchema = new Schema<UserDetailDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    countryCode: {
      type: Number,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    fontSize: {
      type: Number,
      default: 14,
    },
    fontFamily: {
      type: String,
      default: 'Arial',
    },
    fontColor: {
      type: String,
      default: '#808080',
    },
  },
  {
    timestamps: true,
  }
);

const UserDetailModel = model<UserDetailDocument>('UserDetail', useDetailSchema);

export default UserDetailModel;

