import { Box, Avatar, Typography, Stack, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import CVSection from '../ui/CVSection';
import {
  AllUserDetailType,
  EducationType,
  fontType,
  ProjectType,
  SkillType,
  WorkExpType,
} from '@/types/api.type';
import DummyPayment from '../ui/paymentDialog';

const ScrollContainer = styled(Box)(() => ({
  height: 'calc(90vh - 80px)',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  paddingBottom: '20px',
  maxHeight: '90vh',
}));

const CenteredSection = styled(Box)(({ theme }) => ({
  minHeight: '85vh',
  scrollSnapAlign: 'start',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(3),
}));

const Footer = styled(Box)(({ theme }) => ({
  height: '100px',
  background: '#fafafa',
  borderTop: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const getTypographyStyles = (item: fontType) => ({
  fontSize: item.fontSize,
  fontFamily: item.fontFamily,
  color: item.fontColor,
});

const CVPreview = ({ data }: { data: AllUserDetailType }) => {
  const { user, details, educations, experiences, skills, projects } = data;

  return (
    <>
      <ScrollContainer id="cv-content">
        {/* Profile Section */}
        <CenteredSection>
          <Paper sx={{ p: 4, width: '100%', minHeight: '70vh' }}>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Avatar
                src={user.profilePicture}
                alt={user.name}
                sx={{ width: 120, height: 120 }}
              />
              <Typography variant="h4" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
              {details && (
                <>
                  <Typography variant="body2">
                    +{details.countryCode}-{details.phone}
                  </Typography>
                  <Typography variant="body2">
                    {details.address}, {details.city}, {details.state} - {details.pincode}
                  </Typography>
                  <Typography variant="body2">
                    Date of Birth: {new Date(details.dob).toLocaleDateString()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: details.fontSize,
                      fontFamily: details.fontFamily,
                      color: details.fontColor,
                    }}
                  >
                    {details.summary}
                  </Typography>
                </>
              )}
            </Stack>
          </Paper>
        </CenteredSection>

        {/* Education Section */}
        {educations && (
          <CVSection
            title="Education"
            items={educations}
            renderItem={(edu: EducationType) => (
              <Box>
                <Typography variant="h6" sx={getTypographyStyles(edu)}>
                  {edu.degreeType} in {edu.fieldOfStudy}
                </Typography>
                <Typography sx={getTypographyStyles(edu)}>
                  {edu.institutionName}
                </Typography>
                <Typography sx={getTypographyStyles(edu)}>
                  {new Date(edu.startDate).toLocaleDateString()} -{' '}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'present'}
                </Typography>
                <Typography sx={getTypographyStyles(edu)}>
                  Percentage: {edu.percentage}
                </Typography>
              </Box>
            )}
          />
        )}

        {/* Experience Section */}
        {experiences && (
          <CVSection
            title="Experience"
            items={experiences}
            renderItem={(exp: WorkExpType) => (
              <Box>
                <Typography variant="h6" sx={getTypographyStyles(exp)}>
                  {exp.jobTitle} @ {exp.companyName}
                </Typography>
                <Typography sx={getTypographyStyles(exp)}>
                  {exp.joinLocation} | {new Date(exp.joinDate).toLocaleDateString()} -{' '}
                  {exp.leaveDate
                    ? new Date(exp.leaveDate).toLocaleDateString()
                    : 'Present'}
                </Typography>
                <Typography sx={getTypographyStyles(exp)}>
                  CTC: ₹{exp.ctc.toLocaleString()}
                </Typography>
                <Typography sx={getTypographyStyles(exp)}>
                  Stack: {exp.techStack.join(', ')}
                </Typography>
                <Typography sx={getTypographyStyles(exp)}>{exp.description}</Typography>
              </Box>
            )}
          />
        )}

        {/* Skills Section */}
        {skills && (
          <CVSection
            title="Skills"
            items={skills}
            renderItem={(skill: SkillType) => (
              <Box>
                <Typography variant="h6" sx={getTypographyStyles(skill)}>
                  {skill.skillName}
                </Typography>
                <Typography sx={getTypographyStyles(skill)}>
                  Experience: {skill.experienceYears} years
                </Typography>
                <Typography sx={getTypographyStyles(skill)}>
                  Level: {skill.skillLevel}/5
                </Typography>
              </Box>
            )}
          />
        )}

        {/* Projects Section */}
        {projects && (
          <CVSection
            title="Projects"
            items={projects}
            renderItem={(proj: ProjectType) => (
              <Box>
                <Typography variant="h6" sx={getTypographyStyles(proj)}>
                  {proj.projectName}
                </Typography>
                {proj.projectUrl && (
                  <Typography sx={getTypographyStyles(proj)}>
                    <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer">
                      {proj.projectUrl}
                    </a>
                  </Typography>
                )}
                <Typography sx={getTypographyStyles(proj)}>{proj.description}</Typography>
                <Typography sx={getTypographyStyles(proj)}>
                  Stack: {proj.techStack.join(', ')}
                </Typography>
                <Typography sx={getTypographyStyles(proj)}>
                  {new Date(proj.startDate).toLocaleDateString()} -{' '}
                  {proj.endDate ? new Date(proj.endDate).toLocaleDateString() : 'Present'}
                </Typography>
              </Box>
            )}
          />
        )}
      </ScrollContainer>

      {/* Footer Action Buttons */}
      <Footer>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
          className="no-print"
        >
          Download CV
        </Button> */}
        <DummyPayment />
        <Button variant="outlined" color="secondary">
          Share
        </Button>
      </Footer>
    </>
  );
};

export default CVPreview;

