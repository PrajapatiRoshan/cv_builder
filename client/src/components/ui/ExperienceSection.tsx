import { WorkExpType } from '@/types/api.type';
import { getTypographyStyles } from '@/utility/helper';
import { Box, Paper, Typography } from '@mui/material';

const ExperienceSection = ({ exp }: { exp: WorkExpType }) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        border: `1px solid`,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
            sx={getTypographyStyles(exp)}
          >
            {exp.jobTitle} @ {exp.companyName}
          </Typography>

          <Typography variant="body2" sx={getTypographyStyles(exp)}>
            Location: {exp.joinLocation}
          </Typography>

          <Typography variant="body2" sx={getTypographyStyles(exp)}>
            Duration: {new Date(exp.joinDate).toLocaleDateString()} -{' '}
            {exp.leaveDate ? new Date(exp.leaveDate).toLocaleDateString() : 'Present'}
          </Typography>

          <Typography variant="body2" sx={getTypographyStyles(exp)}>
            CTC: ₹{exp.ctc.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ minWidth: 200 }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            mb={1}
            sx={getTypographyStyles(exp)}
          >
            Tech Stack
          </Typography>
          <Typography variant="body2" sx={getTypographyStyles(exp)}>
            {exp.techStack.join(', ')}
          </Typography>
        </Box>
      </Box>

      {exp.description && (
        <Box mt={2}>
          <Typography
            variant="body2"
            sx={{
              ...getTypographyStyles(exp),
              whiteSpace: 'pre-wrap',
            }}
          >
            {exp.description}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ExperienceSection;

