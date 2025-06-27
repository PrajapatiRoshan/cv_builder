import { UserDetailsType, UserType } from '@/types/api.type';
import { Avatar, Box, Typography, Stack, useTheme, Paper } from '@mui/material';

const ResumeHeader = ({
  user,
  details,
}: {
  user: UserType;
  details: UserDetailsType;
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        minHeight: '70vh',
        p: { xs: 2, sm: 4 },
        border: '1px solid #ccc',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: theme.palette.background.default,
        boxSizing: 'border-box',
        overflow: 'hidden',
        '@media print': {
          boxShadow: 'none',
          border: 'none',
          width: '210mm',
          height: '297mm',
          margin: 0,
        },
      }}
      // sx={{
      //   border: '1px solid #ccc',
      //   borderRadius: 2,
      //   p: { xs: 2, sm: 4 },
      //   width: '100%',
      //   borderColor: 'divider',
      //   minHeight: '70vh',
      //   backgroundColor: theme.palette.background.default,
      // }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Avatar
          src={user?.profilePicture || ''}
          alt={user?.name || 'Profile'}
          sx={{
            width: 120,
            height: 120,
            border: `3px solid ${theme.palette.primary.main}`,
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          {user?.name}
        </Typography>
      </Box>

      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          p: 2,
          mb: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body1" color="text.secondary">
            📧 {user?.email}
          </Typography>
          {details && (
            <>
              <Typography variant="body2">
                📞 +{details.countryCode}-{details.phone}
              </Typography>
              <Typography variant="body2">
                📍 {details.address}, {details.city}, {details.state} - {details.pincode}
              </Typography>
              <Typography variant="body2">
                🎂 {new Date(details.dob).toLocaleDateString()}
              </Typography>
            </>
          )}
        </Stack>
      </Box>

      {details?.summary && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 1,
              p: 2,
              backgroundColor: '#fcfcfc',
              flex: 1,
              overflow: 'auto',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: details.fontSize || '0.95rem',
                fontFamily: details.fontFamily || theme.typography.fontFamily,
                color: details.fontColor || theme.palette.text.primary,
                whiteSpace: 'pre-wrap',
              }}
            >
              {details.summary}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ResumeHeader;

