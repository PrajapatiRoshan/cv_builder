// components/forms/EducationForm.tsx

import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import EditorFontSettings from '@/components/ui/EditorFontSettings';
import { formatDateToInput, formateDateToISO } from '@/utility/helper';
import { educationSchemaValidation } from '@/validations/editor.validation';
import { useMutation } from '@tanstack/react-query';
import { addEducationMutationFn, updateEducationMutationFn } from '@/libs/api';
import ToastMessage, { ToastMessageHandle } from '@/components/ui/ToastMessage.com';
import { useRef } from 'react';
import { EducationType } from '@/types/api.type';
import useGetEducationById from '@/hooks/educations/ue-get-educationsById';
import { initialEducation } from '@/pages/ediotr/Education.page';

interface EducationFormProps {
  id?: string;
  initialValues: typeof initialEducation;
  setEducationForms: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

const EducationForm: React.FC<EducationFormProps> = ({
  id,
  initialValues,
  setEducationForms,
}) => {
  const toastRef = useRef<ToastMessageHandle>(null);
  const { data, isLoading, refetch } = useGetEducationById({ id });
  const educationData = data?.education;
  const addMutation = useMutation({ mutationFn: addEducationMutationFn });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EducationType }) =>
      updateEducationMutationFn(id, data),
  });

  const submitHandler = (values: any) => {
    if (addMutation.isPending || updateMutation.isPending) return;

    const isNew = !educationData || Object.keys(educationData).length === 0;

    const payload: EducationType = {
      ...values,
      startDate: formateDateToISO(values.startDate),
      endDate: formateDateToISO(values.endDate),
    };

    if (isNew || !educationData?._id) {
      addMutation.mutate(payload, {
        onSuccess: (data) => {
          toastRef.current?.showToast(data.message || 'Education Added!', 'success');
          refetch();
        },
        onError: (err) => {
          toastRef.current?.showToast(err?.message || 'Something went wrong!', 'error');
        },
      });
    } else {
      updateMutation.mutate(
        { id: educationData._id, data: payload },
        {
          onSuccess: (data) => {
            toastRef.current?.showToast(data.message || 'Education Updated!', 'success');
            refetch();
          },
          onError: (err) => {
            toastRef.current?.showToast(err?.message || 'Something went wrong!', 'error');
          },
        }
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: educationSchemaValidation,
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
            label="Degree Type"
            name="degreeType"
            value={formik.values.degreeType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.degreeType && !!formik.errors.degreeType}
            helperText={
              typeof formik.errors.degreeType === 'string' && formik.touched.degreeType
                ? formik.errors.degreeType
                : undefined
            }
          />
          <TextField
            label="Institution Name"
            name="institutionName"
            value={formik.values.institutionName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.institutionName && !!formik.errors.institutionName}
            helperText={
              typeof formik.errors.institutionName === 'string' &&
              formik.touched.institutionName
                ? formik.errors.institutionName
                : undefined
            }
          />
          <TextField
            label="Field of Study"
            name="fieldOfStudy"
            value={formik.values.fieldOfStudy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fieldOfStudy && !!formik.errors.fieldOfStudy}
            helperText={
              typeof formik.errors.fieldOfStudy === 'string' &&
              formik.touched.fieldOfStudy
                ? formik.errors.fieldOfStudy
                : undefined
            }
          />
          <TextField
            label="Percentage"
            name="percentage"
            value={formik.values.percentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.percentage && !!formik.errors.percentage}
            helperText={
              typeof formik.errors.percentage === 'string' && formik.touched.percentage
                ? formik.errors.percentage
                : undefined
            }
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateToInput(formik.values.startDate)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startDate && !!formik.errors.startDate}
            helperText={
              formik.touched.startDate && typeof formik.errors.startDate === 'string'
                ? formik.errors.startDate
                : ''
            }
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateToInput(formik.values.endDate)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endDate && !!formik.errors.endDate}
            helperText={
              formik.touched.endDate && typeof formik.errors.endDate === 'string'
                ? formik.errors.endDate
                : ''
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
              setEducationForms((prv) => {
                const newState = [...prv];
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

export default EducationForm;

