import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useRef } from 'react';
import { initialSkill } from '@/pages/ediotr/Skills.page';
import ToastMessage, { ToastMessageHandle } from '../ui/ToastMessage.com';
import EditorFontSettings from '../ui/EditorFontSettings';
import { useMutation } from '@tanstack/react-query';
import { skillSchemaValidation } from '@/validations/editor.validation';
import { addSkillMutationFn, updateSkillMutationFn } from '@/libs/api';
import { SkillType } from '@/types/api.type';
import useGetSkillById from '@/hooks/skill/use-get-skillById';

interface SkillsFormProps {
  id?: string;
  initialValues: typeof initialSkill;
  setSkillForm: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ id, initialValues, setSkillForm }) => {
  const toastRef = useRef<ToastMessageHandle>(null);
  const { data, isLoading, refetch } = useGetSkillById({ id });
  const skillData = data?.skill;

  const addSkillMutation = useMutation({ mutationFn: addSkillMutationFn });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SkillType }) =>
      updateSkillMutationFn(id, data),
  });

  const submitHandler = (values: typeof initialSkill) => {
    if (addSkillMutation.isPending || updateMutation.isPending) return;

    const isNew = !skillData || Object.keys(skillData).length === 0;

    const payload = { ...values };

    if (isNew || !skillData?._id) {
      addSkillMutation.mutate(payload, {
        onSuccess: () => {
          toastRef.current?.showToast('Skill added!', 'success');
          refetch();
        },
        onError: () => {
          toastRef.current?.showToast('Error occurred while adding skill.', 'error');
        },
      });
    } else {
      updateMutation.mutate(
        { id: skillData._id, data: payload },
        {
          onSuccess: () => {
            toastRef.current?.showToast('Skill updated!', 'success');
            refetch();
          },
          onError: () => {
            toastRef.current?.showToast('Error occurred while updating skill.', 'error');
          },
        }
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: skillSchemaValidation,
    onSubmit: submitHandler,
  });

  return (
    <Box sx={{ border: '1px solid #ccc', p: 3, mb: 4, borderRadius: 2 }}>
      <EditorFontSettings
        fSize={formik.values.fontSize}
        fFamily={formik.values.fontFamily}
        fColor={formik.values.fontColor}
        onChange={({ fSize, fFamily, fColor }) => {
          formik.setFieldValue('fontSize', fSize);
          formik.setFieldValue('fontFamily', fFamily);
          formik.setFieldValue('fontColor', fColor);
        }}
      />

      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={3}
          mt={2}
        >
          <TextField
            label="Skill Name"
            name="skillName"
            value={formik.values.skillName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.skillName && !!formik.errors.skillName}
            helperText={
              typeof formik.errors.skillName === 'string' && formik.touched.skillName
                ? formik.errors.skillName
                : undefined
            }
          />
          <TextField
            label="Skill Level (1-5)"
            name="skillLevel"
            type="number"
            value={formik.values.skillLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.skillLevel && !!formik.errors.skillLevel}
            helperText={
              typeof formik.errors.skillLevel === 'string' && formik.touched.skillLevel
                ? formik.errors.skillLevel
                : undefined
            }
          />
          <TextField
            label="Experience Years"
            name="experienceYears"
            type="number"
            value={formik.values.experienceYears}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.experienceYears && !!formik.errors.experienceYears}
            helperText={
              typeof formik.errors.experienceYears === 'string' &&
              formik.touched.experienceYears
                ? formik.errors.experienceYears
                : undefined
            }
          />
        </Box>

        <Stack direction="row" spacing={2} mt={4} justifyContent="center">
          <Button
            type="reset"
            variant="outlined"
            onClick={() => formik.resetForm()}
            disabled={isLoading}
          >
            Reset
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            {!id ? 'Add' : 'Update'}
          </LoadingButton>
          <Button
            type="reset"
            variant="outlined"
            onClick={() =>
              setSkillForm((prev) => {
                const newState = [...prev];
                newState.pop();
                return newState;
              })
            }
            disabled={!!id}
          >
            Delete
          </Button>
        </Stack>
      </form>
      <ToastMessage ref={toastRef} />
    </Box>
  );
};

export default SkillsForm;

