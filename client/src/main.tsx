import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './utility/theme.ts';
import { Provider } from 'react-redux';
import { store } from './store/config.store.ts';
import QueryProvider from './context/query-provider.context.tsx';
import AppRoutes from './routes/App.routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);

requestIdleCallback(() => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.remove();
  }
});

