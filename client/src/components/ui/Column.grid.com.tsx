import { Box } from '@mui/material';
import { ReactNode } from 'react';

const ColumnGrid = ({ children, props }: { children: ReactNode; props?: any }) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      }}
    >
      {children}
    </Box>
  );
};

export default ColumnGrid;

