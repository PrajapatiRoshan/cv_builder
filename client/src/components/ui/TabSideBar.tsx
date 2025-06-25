import { EDITOR_ROUTES } from '@/routes/common/routesPath';
import { Box, Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const TABLIST = [
  { label: 'Basic Details', path: EDITOR_ROUTES.USERDETAIL },
  { label: 'Education', path: EDITOR_ROUTES.EDUCATION },
  { label: 'Experience', path: EDITOR_ROUTES.EXPERIENCE },
  { label: 'Skills', path: EDITOR_ROUTES.SKILLS },
  { label: 'Projects', path: EDITOR_ROUTES.PROJECT },
] as const;

const TabSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  return (
    <Box
      sx={{
        width: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Stack alignItems="flex-start">
        {TABLIST.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <Button
              key={tab.path}
              variant={isActive ? 'contained' : 'outlined'}
              onClick={() => navigate(`/editor/${tab.path}`)}
              sx={{
                height: 60,
                width: '100%',
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                textTransform: 'none',
                fontWeight: isActive ? 'bold' : 400,
                bgcolor: isActive ? 'primary.main' : 'background.paper',
                color: isActive ? 'common.white' : 'text.primary',
                fontSize: isActive ? 18 : 14,

                transition: 'all 0.2s',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'grey.100',
                },
                zIndex: isActive ? 1 : 0,
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TabSideBar;

