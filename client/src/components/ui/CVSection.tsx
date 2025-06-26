import { Box, Typography, Divider, Stack, Paper } from '@mui/material';
import { styled } from '@mui/system';
import {
  EducationType,
  OtherDetail,
  ProjectType,
  SkillType,
  WorkExpType,
} from '@/types/api.type';

const SectionWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  scrollSnapAlign: 'start',
  padding: theme.spacing(4),
}));

const CVSection = ({
  title,
  items,
  renderItem,
}: {
  title: String;
  items:
    | (OtherDetail & EducationType)[]
    | (OtherDetail & WorkExpType)[]
    | (OtherDetail & SkillType)[]
    | (OtherDetail & ProjectType)[];
  renderItem: any;
}) => {
  return (
    <SectionWrapper>
      <Paper
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          p: { xs: 2, sm: 4 },
          width: '100%',
          borderColor: 'divider',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          // border: '2px solid black',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 4, mt: 2 }} />
        <Stack spacing={2}>
          {items.map((item) => (
            <Box key={item._id}>{renderItem(item)}</Box>
          ))}
        </Stack>
      </Paper>
    </SectionWrapper>
  );
};

export default CVSection;

