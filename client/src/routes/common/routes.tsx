import SignIn from '@/pages/auth/SignIn';
import { AUTH_ROUTES, EDITOR_ROUTES, PROTECTED_ROUTES } from './routesPath';
import GoogleOAuth from '@/pages/auth/GoogleOAuth';
import DashboardPage from '@/pages/DashBoard.page';
import { lazy } from 'react';

const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const UserDetailPage = lazy(() => import('@/pages/ediotr/UserDetail.page'));
const EducationDetailsPage = lazy(() => import('@/pages/ediotr/Education.page'));
const ExperiencePage = lazy(() => import('@/pages/ediotr/Experience.page'));
const SkillsPage = lazy(() => import('@/pages/ediotr/Skills.page'));
const ProjectPage = lazy(() => import('@/pages/ediotr/Project.page'));

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuth /> },
] as const;

export const dashBoardRoutePaths = [
  { path: PROTECTED_ROUTES.USER, element: <DashboardPage /> },
] as const;

export const editorRoutePaths = [
  { path: EDITOR_ROUTES.USERDETAIL, element: <UserDetailPage /> },
  { path: EDITOR_ROUTES.EDUCATION, element: <EducationDetailsPage /> },
  { path: EDITOR_ROUTES.EXPERIENCE, element: <ExperiencePage /> },
  { path: EDITOR_ROUTES.SKILLS, element: <SkillsPage /> },
  { path: EDITOR_ROUTES.PROJECT, element: <ProjectPage /> },
] as const;

