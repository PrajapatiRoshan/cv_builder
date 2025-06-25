import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useGetAllProject from '@/hooks/projects/use-get-Allproject';
import ProjectForm from '@/components/forms/ProjectForm';

export const initialProject = {
  projectName: '',
  projectUrl: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  techStack: '',
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
};

const ProjectPage = () => {
  const { data, isLoading } = useGetAllProject();
  const [projectForm, setProjectForm] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading) {
      if (data?.projects?.length) {
        setProjectForm(data.projects);
      } else {
        setProjectForm([{ id: Date.now() }]);
      }
    }
  }, [isLoading, data]);

  const handleAddForm = () => {
    setProjectForm((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Skills Details
      </Typography>
      {!isLoading &&
        projectForm.map((formItem) => (
          <ProjectForm
            key={formItem._id || formItem.id}
            id={formItem._id}
            initialValues={formItem._id ? formItem : initialProject}
            setProjectForm={setProjectForm}
          />
        ))}

      <Stack direction="row" justifyContent="center">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddForm}>
          Add More Project
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectPage;

