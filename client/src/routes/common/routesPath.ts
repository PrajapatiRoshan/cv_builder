export const AUTH_ROUTES = {
  SIGN_IN: '/',
  SIGN_UP: '/sign-up',
  GOOGLE_OAUTH_CALLBACK: '/google/oauth/callback',
} as const;

export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(
    pathname as (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES]
  );
};

export const PROTECTED_ROUTES = {
  USER: '/dashBoard',
} as const;

export const EDITOR_ROUTES = {
  USERDETAIL: 'userdetail',
  EDUCATION: 'education',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECT: 'project',
} as const;

