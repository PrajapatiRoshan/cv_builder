import {
  initialEducation,
  initialExperience,
  initialProject,
  initialSkill,
} from '@/constant/enums.const';
import { AlertColor } from '@mui/material';
import { UserType } from './api.type';

export interface EducationFormProps {
  id?: string;
  initialValues: typeof initialEducation;
  setEducationForms: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

export interface WorkExperienceFormProps {
  id?: string;
  initialValues: typeof initialExperience;
  setWorkForms: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

export interface ProjectFormProps {
  id?: string;
  initialValues: typeof initialProject;
  setProjectForm: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

export interface SkillsFormProps {
  id?: string;
  initialValues: typeof initialSkill;
  setSkillForm: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

export interface EditorFontSettingsProps {
  fSize?: number;
  fFamily?: string;
  fColor?: string;
}

export interface EditorFontSettingsComponentProps extends EditorFontSettingsProps {
  onChange: (data: EditorFontSettingsProps) => void;
}

export interface DialogBoxHandle {
  open: () => void;
  close: () => void;
}

export type ToastMessageHandle = {
  showToast: (message: string, severity?: AlertColor) => void;
};

export type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetchAuth: () => void;
};

