import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EducationForm from '@/components/forms/EducationForm';
import useGetAllEducations from '@/hooks/educations/use-get-AllEducations';
import { initialEducation } from '@/constant/enums.const';

const EducationDetailsPage = () => {
  const { data, isLoading } = useGetAllEducations();
  const [educationForms, setEducationForms] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading) {
      if (data?.educations?.length) {
        setEducationForms(data.educations);
      } else {
        setEducationForms([{ id: Date.now() }]);
      }
    }
  }, [isLoading, data]);

  const handleAddForm = () => {
    setEducationForms((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Education Details
      </Typography>
      {!isLoading &&
        educationForms.map((formItem) => (
          <EducationForm
            key={formItem._id || formItem.id}
            id={formItem._id}
            initialValues={formItem._id ? formItem : initialEducation}
            setEducationForms={setEducationForms}
          />
        ))}

      <Stack direction="row" justifyContent="center">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddForm}>
          Add More Education
        </Button>
      </Stack>
    </Box>
  );
};

export default EducationDetailsPage;

