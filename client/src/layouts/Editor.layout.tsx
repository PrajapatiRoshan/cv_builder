import TabSideBar from '@/components/ui/TabSideBar';
import useGetAllUSerDetails from '@/hooks/user/use-get-AllDetails';
import { PROTECTED_ROUTES } from '@/routes/common/routesPath';
import { Box, Button, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const CVPreview = lazy(() => import('@/components/resumeTemplate/OnePageFormate.cv'));

const EditorLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data, isLoading } = useGetAllUSerDetails();

  const [previewWidth, setPreviewWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;

      if (newWidth >= 400 && newWidth <= 800) {
        setPreviewWidth(newWidth);
      }
    };

    const stopDragging = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopDragging);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  if (isLoading || !data)
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size="5rem" />
      </Box>
    );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Box
        sx={{
          width: '250px',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Back button fixed at the top-left corner inside sidebar */}
        <Button
          variant="outlined"
          // onClick={() => window.history.back()}
          onClick={() => navigate(PROTECTED_ROUTES.USER)}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            minWidth: 'auto',
            padding: '6px 12px',
            zIndex: 10,
          }}
        >
          Back
        </Button>

        {/* Push the TabSideBar down a bit, so it doesn't overlap with the button */}
        <Box sx={{ marginTop: '30vh', width: '100%' }}>
          <TabSideBar />
        </Box>
      </Box>

      <Box ref={containerRef} sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Outlet />
        </Box>

        {!isMobile && (
          <Box
            onMouseDown={() => setIsDragging(true)}
            sx={{
              width: '4px',
              cursor: 'col-resize',
              bgcolor: 'divider',
              '&:hover': { bgcolor: 'primary.main' },
            }}
          />
        )}

        {!isMobile && (
          <Box
            sx={{
              width: previewWidth,
              minWidth: 400,
              maxWidth: 800,
              bgcolor: '#fafafa',
              p: 3,
              borderLeft: '1px solid',
              borderColor: 'divider',
              overflowY: 'auto',
              maxHeight: '100vh',
            }}
          >
            <Suspense fallback={<CircularProgress size="5rem" />}>
              <CVPreview data={data} />
            </Suspense>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditorLayout;

