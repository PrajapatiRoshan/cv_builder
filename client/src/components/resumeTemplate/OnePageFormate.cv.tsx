import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import CVSection from '../ui/CVSection';
import {
  AllUserDetailType,
  EducationType,
  ProjectType,
  SkillType,
  WorkExpType,
} from '@/types/api.type';
import ResumeHeader from '../ui/ResumeHeader';
import EducationSection from '../ui/EducationSection';
import ExperienceSection from '../ui/ExperienceSection';
import SkillsSection from '../ui/SkillsSection';
import ProjectSection from '../ui/ProjectSection';
import { useRef } from 'react';
import DialogBox from '../ui/DialogBox';
import { DialogBoxHandle } from '@/types/interface';

const ScrollContainer = styled(Box)(() => ({
  height: 'calc(90vh - 80px)',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  paddingBottom: '20px',
  maxHeight: '90vh',
}));

const CenteredSection = styled(Box)(({ theme }) => ({
  // minHeight: '70vh',
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

const CVPreview = ({ data }: { data: AllUserDetailType }) => {
  const { user, details, educations, experiences, skills, projects } = data;
  const dialogRef = useRef<DialogBoxHandle>(null);
  const openDialog = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.open();
    }
  };

  return (
    <>
      <ScrollContainer id="cv-content">
        <CenteredSection>
          {/* <ResumeHeader user={user} details={details} />
           */}
          <ResumeHeader user={user} details={details} />
        </CenteredSection>
        {/* <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
            padding: 2,
          }}
        >
          <Box
            sx={{
              transform: 'scale(0.75)', // or calculate dynamically based on container
              transformOrigin: 'top left',
              '@media print': {
                transform: 'none',
              },
            }}
          >
            <ResumeHeader user={user} details={details} />
          </Box>
        </Box> */}
        {educations && (
          <CVSection
            title="Education"
            items={educations}
            renderItem={(edu: EducationType) => <EducationSection edu={edu} />}
          />
        )}

        {experiences && (
          <CVSection
            title="Experience"
            items={experiences}
            renderItem={(exp: WorkExpType) => <ExperienceSection exp={exp} />}
          />
        )}

        {skills && (
          <CVSection
            title="Skills"
            items={skills}
            renderItem={(skill: SkillType) => <SkillsSection skill={skill} />}
          />
        )}

        {projects && (
          <CVSection
            title="Projects"
            items={projects}
            renderItem={(proj: ProjectType) => <ProjectSection proj={proj} />}
          />
        )}
      </ScrollContainer>

      <Footer>
        {/* <DummyPayment /> */}
        <Button variant="contained" onClick={openDialog}>
          Download
        </Button>
        <Button variant="outlined" color="secondary" onClick={openDialog}>
          Share
        </Button>
      </Footer>

      <DialogBox ref={dialogRef} />
    </>
  );
};

export default CVPreview;

