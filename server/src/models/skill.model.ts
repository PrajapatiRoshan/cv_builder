import mongoose from 'mongoose';

export interface SkillDocument extends Document {
  userId: mongoose.Types.ObjectId;
  skillName: string;
  skillLevel: number; // (e.g., 1-5)
  experienceYears: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new mongoose.Schema<SkillDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);
const SkillModel = mongoose.model<SkillDocument>('Skill', skillSchema);
export default SkillModel;

