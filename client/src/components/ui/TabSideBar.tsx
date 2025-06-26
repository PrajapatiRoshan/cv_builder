import { TABLIST } from '@/constant/enums.const';
import { Box, Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

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

