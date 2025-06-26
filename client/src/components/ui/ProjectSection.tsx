import { Box, Paper, Typography, Link } from '@mui/material';
import { ProjectType } from '@/types/api.type';
import { getTypographyStyles } from '@/utility/helper';

const ProjectSection = ({ proj }: { proj: ProjectType }) => {
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
      <Box>
        <Typography
          variant="h6"
          sx={{ ...getTypographyStyles(proj), fontWeight: 'bold', mb: 1 }}
        >
          {proj.projectName}
        </Typography>

        {proj.projectUrl && (
          <Typography sx={{ mb: 1 }}>
            <Link
              href={proj.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="primary"
              sx={{ wordBreak: 'break-all' }}
            >
              {proj.projectUrl}
            </Link>
          </Typography>
        )}

        <Typography sx={{ mb: 1, ...getTypographyStyles(proj) }}>
          {proj.description}
        </Typography>

        <Typography sx={{ mb: 1, fontStyle: 'italic', color: 'text.secondary' }}>
          Stack: {proj.techStack.join(', ')}
        </Typography>

        <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
          {new Date(proj.startDate).toLocaleDateString()} -{' '}
          {proj.endDate ? new Date(proj.endDate).toLocaleDateString() : 'Present'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProjectSection;

