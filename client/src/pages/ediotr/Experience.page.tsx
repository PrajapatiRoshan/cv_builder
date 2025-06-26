import ExperienceForm from '@/components/forms/ExperienceForm';
import useGetAllWorkExperience from '@/hooks/experience/use-get-AllExperience';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { initialExperience } from '@/constant/enums.const';

const ExperiencePage = () => {
  const { data, isLoading } = useGetAllWorkExperience();
  const [workForm, setWorkForms] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading) {
      if (data?.workExps?.length) {
        setWorkForms(data.workExps);
      } else {
        setWorkForms([{ id: Date.now() }]);
      }
    }
  }, [isLoading, data]);

  const handleAddForm = () => {
    setWorkForms((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Work Experience Details
      </Typography>
      {!isLoading &&
        workForm.map((formItem) => (
          <ExperienceForm
            key={formItem._id || formItem.id}
            id={formItem._id}
            initialValues={formItem._id ? formItem : initialExperience}
            setWorkForms={setWorkForms}
          />
        ))}

      <Stack direction="row" justifyContent="center">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddForm}>
          Add More Experience
        </Button>
      </Stack>
    </Box>
  );
};

export default ExperiencePage;

