import { SkillType } from '@/types/api.type';
import { getTypographyStyles } from '@/utility/helper';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const SkillsSection = ({ skill }: { skill: SkillType }) => {
  const percentage = (skill.skillLevel / 5) * 100;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={60}
            thickness={5}
            sx={{
              color: 'primary.main',
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {skill.skillLevel}/5
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{ ...getTypographyStyles(skill), fontWeight: 'bold' }}
          >
            {skill.skillName}
          </Typography>
          <Typography variant="body2" sx={getTypographyStyles(skill)}>
            Experience: {skill.experienceYears} years
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SkillsSection;

