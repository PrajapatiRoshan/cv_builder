import { EducationType } from '@/types/api.type';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';

const EducationSection = ({ edu }: { edu: EducationType }) => {
  return (
    <Paper sx={{ p: 2, mb: 2, border: '1px solid', borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
            {edu.degreeType} in {edu.fieldOfStudy}
          </Typography>
          <Typography>{edu.institutionName}</Typography>
        </Box>
        <Box sx={{ flexShrink: 0, minWidth: 150 }}>
          <Typography>
            {new Date(edu.startDate).toLocaleDateString()} -{' '}
            {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
          </Typography>
          <Box mt={1}>
            <Typography variant="body2" mb={0.5}>
              Percentage: {edu.percentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Number(edu.percentage)}
              sx={{
                height: 8,
                borderRadius: 5,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default EducationSection;

