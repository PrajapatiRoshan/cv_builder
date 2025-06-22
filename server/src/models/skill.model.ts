import { Document, model, Schema, Types } from 'mongoose';

export interface SkillDetail {
  skillName: string;
  skillLevel: number; // (e.g., 1-5)
  experienceYears: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
}

export interface SkillDocument extends Document, SkillDetail {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<SkillDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    skillLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
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
const SkillModel = model<SkillDocument>('Skill', skillSchema);

export default SkillModel;

