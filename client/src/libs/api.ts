import {
  AllEducationResType,
  AllProjectResType,
  AllSkillResType,
  AllTemplateResponseType,
  AllUserDetailResponseType,
  AllWorkExpResType,
  CurrentUserResponseType,
  EducationResType,
  EducationType,
  LoginResponseType,
  loginType,
  ProjectResType,
  ProjectType,
  registerType,
  SkillResType,
  SkillType,
  updateUserDetailReqType,
  UserDetailsResType,
  UserDetailsType,
  WorkExpResType,
  WorkExpType,
} from '@/types/api.type';
import API from './axios-client';

//---------------------------Auth-------------------
export const loginMutationFn = async (data: loginType): Promise<LoginResponseType> => {
  const response = await API.post('auth/login', data);
  return response?.data;
};

export const registerMutationFn = async (
  data: registerType
): Promise<{ message: string }> => await API.post(`/auth/register`, data);

export const logoutMutationFn = async () => await API.post('/auth/logout');

export const getCurrentUserQueryFn = async (): Promise<CurrentUserResponseType> => {
  const response = await API.get(`/user/current`);
  return response?.data;
};

export const deleteUser = async (): Promise<CurrentUserResponseType> => {
  const response = await API.delete(`/user/delete`);
  return response?.data;
};

//---------------------------User-------------------
export const getAllUserDetailsQueryFn = async (): Promise<AllUserDetailResponseType> => {
  const response = await API.get('user/allDetails');
  return response?.data;
};

export const getAllTemplateQueryFn = async (): Promise<AllTemplateResponseType> => {
  const response = await API.get('user/allCvTemplates');
  return response?.data;
};

export const updateUserMutationFn = async (
  data: updateUserDetailReqType
): Promise<CurrentUserResponseType> => {
  const response = await API.put('user/updateDetails', data);
  return response?.data;
};

//---------------------------User Detail-------------------
export const createUSerDetailMutationFn = async (
  data: UserDetailsType
): Promise<UserDetailsResType> => {
  const response = await API.post('userDetails/addDetail', data);
  return response?.data;
};

export const updateUserDetailMutationFn = async (
  data: UserDetailsType
): Promise<UserDetailsResType> => {
  const response = await API.put('userDetails/updateDetail', data);
  return response?.data;
};

export const getUserDetailQueryFn = async (): Promise<UserDetailsResType> => {
  const response = await API.get('userDetails/detail');
  return response?.data;
};

//---------------------------Education-------------------
export const addEducationMutationFn = async (
  data: EducationType
): Promise<EducationResType> => {
  const response = await API.post('educations/addEducation', data);
  return response?.data;
};

export const updateEducationMutationFn = async (
  id: string,
  data: EducationType
): Promise<EducationResType> => {
  const response = await API.put(`educations/updateEducation/${id}/update`, data);
  return response?.data;
};

export const getEducationByIdQueryFn = async (id: string): Promise<EducationResType> => {
  const response = await API.get(`educations/detailEducation/${id}/get`);
  return response?.data;
};

export const getAllEducationDetailQueryFn = async (): Promise<AllEducationResType> => {
  const response = await API.get(`educations/allEducations/`);
  return response?.data;
};

//---------------------------Work Experience-------------------
export const addWorkExpMutationFn = async (
  data: WorkExpType
): Promise<WorkExpResType> => {
  const response = await API.post('workExps/addWorkExp', data);
  return response?.data;
};

export const updateWorkExpMutationFn = async (
  id: string,
  data: WorkExpType
): Promise<WorkExpResType> => {
  const response = await API.put(`workExps/updateWorkExp/${id}/update`, data);
  return response?.data;
};

export const getWorkExpByIdQueryFn = async (id: string): Promise<WorkExpResType> => {
  const response = await API.get(`workExps/detailWorkExp/${id}/get`);
  return response?.data;
};

export const getAllWorkExpDetailQueryFn = async (): Promise<AllWorkExpResType> => {
  const response = await API.get(`workExps/allWorkExps/`);
  return response?.data;
};

//---------------------------Skills-------------------
export const addProjectMutationFn = async (
  data: ProjectType
): Promise<ProjectResType> => {
  const response = await API.post('projects/addProject', data);
  return response?.data;
};

export const updateProjectMutationFn = async (
  id: string,
  data: ProjectType
): Promise<ProjectResType> => {
  const response = await API.put(`projects/updateProject/${id}/update`, data);
  return response?.data;
};

export const getProjectByIdQueryFn = async (id: string): Promise<ProjectResType> => {
  const response = await API.get(`projects/detailProject/${id}/get`);
  return response?.data;
};

export const getAllProejctDetailQueryFn = async (): Promise<AllProjectResType> => {
  const response = await API.get(`projects/allProjects/`);
  return response?.data;
};

//---------------------------Project-------------------
export const addSkillMutationFn = async (data: SkillType): Promise<SkillResType> => {
  const response = await API.post('skills/addSkill', data);
  return response?.data;
};

export const updateSkillMutationFn = async (
  id: string,
  data: SkillType
): Promise<SkillResType> => {
  const response = await API.put(`skills/updateSkill/${id}/update`, data);
  return response?.data;
};

export const getSkillByIdQueryFn = async (id: string): Promise<SkillResType> => {
  const response = await API.get(`skills/detailSkill/${id}/get`);
  return response?.data;
};

export const getAllSkillDetailQueryFn = async (): Promise<AllSkillResType> => {
  const response = await API.get(`skills/allSkills`);
  return response?.data;
};

