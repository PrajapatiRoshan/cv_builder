import BaseLayout from '@/layouts/Base.layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import {
  authenticationRoutePaths,
  dashBoardRoutePaths,
  editorRoutePaths,
} from './common/routes';
import AuthRoute from './auth.route';
import ProtectedRoute from './protected.rotue';
import NotFoundView from '@/pages/NotFoundView';
import AppLayout from '@/layouts/App.layout';
import EditorLayout from '@/layouts/Editor.layout';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import GlobalLoader from '@/components/ui/GlobalLoader';

const AppRoutes = () => (
  <Suspense fallback={<GlobalLoader />}>
    <BrowserRouter>
      <Routes>
        {/* <Route element={<BaseLayout />}> */}
        <Route path="/" element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {dashBoardRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="editor" element={<EditorLayout />}>
            {editorRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<CircularProgress size="5rem" />}>
                    {route.element}
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default AppRoutes;

