import { Document, model, Schema, Types } from 'mongoose';
import { DegreeListEnum, degreeListEnumType } from '../enums/degree-list.enum';

export interface EducationDetails {
  degreeType: degreeListEnumType;
  institutionName: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date | null;
  percentage?: string | null;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
}

export interface EducationDocument extends Document, EducationDetails {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<EducationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
    percentage: {
      type: String,
      default: null,
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

const EducationModel = model<EducationDocument>('Education', educationSchema);

export default EducationModel;

