import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SkillsForm from '@/components/forms/SkillForm';
import useGetAllSkills from '@/hooks/skill/use-get-allSkills';

export const initialSkill = {
  skillName: '',
  skillLevel: 1,
  experienceYears: 0,
  fontSize: 14,
  fontFamily: 'Arial',
  fontColor: '#333333',
};

const SkillsPage = () => {
  const { data, isLoading } = useGetAllSkills();
  const [skillFrom, setSkillForm] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading) {
      if (data?.skills?.length) {
        setSkillForm(data.skills);
      } else {
        setSkillForm([{ id: Date.now() }]);
      }
    }
  }, [isLoading, data]);

  const handleAddForm = () => {
    if (data?.skills?.length) return;
    setSkillForm((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>
        Skills Details
      </Typography>
      {!isLoading &&
        skillFrom.map((formItem) => (
          <SkillsForm
            key={formItem._id || formItem.id}
            id={formItem._id}
            initialValues={formItem._id ? formItem : initialSkill}
            setSkillForm={setSkillForm}
          />
        ))}

      <Stack direction="row" justifyContent="center">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddForm}>
          Add More Skill
        </Button>
      </Stack>
    </Box>
  );
};

export default SkillsPage;

