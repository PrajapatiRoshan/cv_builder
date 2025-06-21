import { Schema } from 'mongoose';

export interface UserDetailDocument extends Document {
  countryCode: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: Number;
  dob: Date;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const useDetailSchema = new Schema<UserDetailDocument>(
  {
    countryCode: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

