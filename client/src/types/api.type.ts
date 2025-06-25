export type loginType = { email: string; password: string };

export type LoginResponseType = {
  message: string;
  access_token: string;
  user: {
    _id: string;
    name: string;
    profilePicture?: string;
    email: string;
    cvTemplateId: string;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

export type fontType = {
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  cvTemplateId: string;
  lastLogin?: null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};

export type OtherDetail = {
  _id?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserDetailsType = fontType & {
  countryCode: number;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  dob: Date;
  summary: string;
};

export type UserDetailsResType = {
  message: string;
  detail: UserDetailsType & OtherDetail;
};

export type EducationType = fontType & {
  degreeType: string;
  institutionName: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  percentage?: string;
};

export type EducationResType = {
  message: string;
  education: EducationType & OtherDetail;
};

export type AllEducationResType = {
  message: string;
  educations: (EducationType & OtherDetail)[];
};

export type WorkExpType = fontType & {
  companyName: string;
  joinLocation: string;
  jobTitle: string;
  ctc: number;
  joinDate: Date;
  leaveDate?: Date | null;
  techStack: string[];
  description?: string;
};

export type WorkExpResType = {
  message: string;
  workExp: WorkExpType & OtherDetail;
};

export type AllWorkExpResType = {
  message: string;
  workExps: (WorkExpType & OtherDetail)[];
};

export type ProjectType = fontType & {
  projectName: string;
  projectUrl: string;
  description: string;
  startDate: Date;
  endDate: Date;
  techStack: string[];
};

export type ProjectResType = {
  message: string;
  project: ProjectType & OtherDetail;
};

export type AllProjectResType = {
  message: string;
  projects: (ProjectType & OtherDetail)[];
};

export type SkillType = fontType & {
  skillName: string;
  skillLevel: number;
  experienceYears: number;
};

export type SkillResType = {
  message: string;
  skill: SkillType & OtherDetail;
};

export type AllSkillResType = {
  message: string;
  skills: (SkillType & OtherDetail)[];
};

export type AllUserDetailType = {
  user: UserType;
  details: UserDetailsType;
  educations: EducationType[];
  experiences: WorkExpType[];
  projects: ProjectType[];
  skills: SkillType[];
};

export type AllUserDetailResponseType = AllUserDetailType & {
  message: string;
};

export type AllTemplateResponseType = {
  message: string;
  templates: string[];
};

export type updateUserDetailReqType = {
  email: string;
  name: string;
  cvTemplateId: string;
};

