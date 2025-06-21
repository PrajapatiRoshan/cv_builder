import mongoose, { model } from 'mongoose';

export interface ExperienceDocument extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  joinLocation: string;
  jobTitle: string;
  ctc: string;
  joinDate: Date;
  leaveDate?: Date | null;
  techStack: string[];
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new mongoose.Schema<ExperienceDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const ExperienceModel = model<ExperienceDocument>('Experience', experienceSchema);

export default ExperienceModel;

