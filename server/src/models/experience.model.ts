import { Document, model, Schema, Types } from 'mongoose';

export interface ExperienceDocument extends Document {
  userId: Types.ObjectId;
  companyName: string;
  joinLocation: string;
  jobTitle: string;
  ctc: number;
  joinDate: Date;
  leaveDate?: Date | null;
  techStack: string[];
  description?: string | null;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<ExperienceDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    joinLocation: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    ctc: {
      type: Number,
      required: true,
      trim: true,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    leaveDate: {
      type: Date,
      default: null,
    },
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Tech stack must contain at least one item.',
      },
    },
    description: {
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

const ExperienceModel = model<ExperienceDocument>('Experience', experienceSchema);

export default ExperienceModel;

