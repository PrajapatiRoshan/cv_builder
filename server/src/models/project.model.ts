import { Document, model, Schema, Types } from 'mongoose';

export interface ProjectDetail {
  projectName: string;
  projectUrl?: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  techStack: string[];
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
}

export interface ProjectDocument extends Document, ProjectDetail {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
const ProjectModel = model<ProjectDocument>('Project', projectSchema);

export default ProjectModel;

