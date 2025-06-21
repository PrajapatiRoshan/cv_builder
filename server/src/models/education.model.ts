import mongoose, { model } from 'mongoose';
import { DegreeListEnum, degreeListEnumType } from '../enums/degree-list.enum';

export interface EducationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  degreeType: degreeListEnumType;
  institutionName: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date | null;
  grade?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new mongoose.Schema<EducationDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    degreeType: {
      type: String,
      enum: Object.values(DegreeListEnum),
      required: true,
    },
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    grade: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model<EducationDocument>('Education', educationSchema);
