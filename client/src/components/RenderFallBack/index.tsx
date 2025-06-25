import { Box, LinearProgress } from '@mui/material';

const RenderFallBack = () => {
  return (
    <Box sx={{ width: '100vw', height: '100dvh' }} component="div">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: { xs: 160, sm: 320 },
          }}
        />
      </Box>
    </Box>
  );
};

export default RenderFallBack;

