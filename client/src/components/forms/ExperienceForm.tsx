import { addWorkExpMutationFn, updateWorkExpMutationFn } from '@/libs/api';
import ToastMessage from '../ui/ToastMessage.com';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { WorkExpType } from '@/types/api.type';
import useGetExperienceById from '@/hooks/experience/use.get-ExperienceById';
import { formatDateToInput, formateDateToISO } from '@/utility/helper';
import { useFormik } from 'formik';
import { workExperienceSchemaValidation } from '@/validations/editor.validation';
import { Box, Button, Stack, TextField } from '@mui/material';
import EditorFontSettings from '../ui/EditorFontSettings';
import { LoadingButton } from '@mui/lab';
import { useOutletContext } from 'react-router';
import { ToastMessageHandle, WorkExperienceFormProps } from '@/types/interface';

const ExperienceForm: React.FC<WorkExperienceFormProps> = ({
  id,
  initialValues,
  setWorkForms,
}) => {
  const toastRef = useRef<ToastMessageHandle>(null);
  const { data, isLoading, refetch } = useGetExperienceById({ id });
  const workData = data?.workExp;
  const addWorkMutation = useMutation({ mutationFn: addWorkExpMutationFn });
  const updateWorkMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: WorkExpType }) =>
      updateWorkExpMutationFn(id, data),
  });
  const { refetchUserDetails } = useOutletContext<{ refetchUserDetails: () => void }>();

  const submitHandler = (values: any) => {
    if (addWorkMutation.isPending || updateWorkMutation.isPending) return;

    const isNew = !workData || Object.keys(workData).length === 0;

    const payload = {
      ...values,
      joinDate: formateDateToISO(values.joinDate),
      leaveDate: formateDateToISO(values.leaveDate),
      techStack: values.techStack.split(',').map((t: string) => t.trim()),
    };

    if (isNew || !workData?._id) {
      addWorkMutation.mutate(payload, {
        onSuccess: () => {
          toastRef.current?.showToast('Work experience added!', 'success');
          refetch();
          refetchUserDetails();
        },
        onError: () => {
          toastRef.current?.showToast('Error occurred while adding.', 'error');
        },
      });
    } else {
      updateWorkMutation.mutate(
        { id: workData._id, data: payload },
        {
          onSuccess: () => {
            toastRef.current?.showToast('Work experience updated!', 'success');
            refetch();
          },
          onError: () => {
            toastRef.current?.showToast('Error occurred while updating.', 'error');
          },
        }
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: workExperienceSchemaValidation,
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
            label="Company Name"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyName && !!formik.errors.companyName}
            helperText={
              typeof formik.errors.companyName === 'string' && formik.touched.companyName
                ? formik.errors.companyName
                : undefined
            }
          />
          <TextField
            label="Location"
            name="joinLocation"
            value={formik.values.joinLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.joinLocation && !!formik.errors.joinLocation}
            helperText={
              typeof formik.errors.joinLocation === 'string' &&
              formik.touched.joinLocation
                ? formik.errors.joinLocation
                : undefined
            }
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && !!formik.errors.jobTitle}
            helperText={
              typeof formik.errors.jobTitle === 'string' && formik.touched.jobTitle
                ? formik.errors.jobTitle
                : undefined
            }
          />
          <TextField
            label="CTC (Annual)"
            name="ctc"
            type="number"
            value={formik.values.ctc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ctc && !!formik.errors.ctc}
            helperText={
              typeof formik.errors.ctc === 'string' && formik.touched.ctc
                ? formik.errors.ctc
                : undefined
            }
          />
          <TextField
            label="Joining Date"
            name="joinDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateToInput(formik.values.joinDate)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.joinDate && !!formik.errors.joinDate}
            helperText={
              typeof formik.errors.joinDate === 'string' && formik.touched.joinDate
                ? formik.errors.joinDate
                : undefined
            }
          />
          <TextField
            label="Leaving Date"
            name="leaveDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateToInput(formik.values.leaveDate)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.leaveDate && !!formik.errors.leaveDate}
            helperText={
              typeof formik.errors.leaveDate === 'string' && formik.touched.leaveDate
                ? formik.errors.leaveDate
                : undefined
            }
          />
          <TextField
            label="Tech Stack (comma separated)"
            name="techStack"
            value={formik.values.techStack}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.techStack && !!formik.errors.techStack}
            helperText={
              typeof formik.errors.techStack === 'string' && formik.touched.techStack
                ? formik.errors.techStack
                : undefined
            }
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={
              typeof formik.errors.description === 'string' && formik.touched.description
                ? formik.errors.description
                : undefined
            }
            multiline
            rows={4}
            fullWidth
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
              setWorkForms((prv) => {
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

export default ExperienceForm;

