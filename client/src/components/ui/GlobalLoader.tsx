import { Box, CircularProgress, Fade } from '@mui/material';
import { useEffect, useState } from 'react';

const GlobalLoader = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fade in={show}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(3px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} thickness={5} color="primary" />
      </Box>
    </Fade>
  );
};

export default GlobalLoader;

