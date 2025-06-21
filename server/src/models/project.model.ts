import mongoose from 'mongoose';

export interface ProjectDocument extends Document {
  userId: mongoose.Types.ObjectId;
  projectName: string;
  projectUrl?: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const projectSchema = new mongoose.Schema<ProjectDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectUrl: {
      type: String,
      default: null,
    },
    description: {
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
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Tech stack must contain at least one item.',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProjectModel = mongoose.model<ProjectDocument>('Project', projectSchema);
export default ProjectModel;

