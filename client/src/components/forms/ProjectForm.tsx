import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useRef } from 'react';
import ToastMessage, { ToastMessageHandle } from '../ui/ToastMessage.com';
import EditorFontSettings from '../ui/EditorFontSettings';
import { useMutation } from '@tanstack/react-query';
import { formatDateToInput, formateDateToISO } from '@/utility/helper';
import { initialProject } from '@/pages/ediotr/Project.page';
import { projectSchemaValidation } from '@/validations/editor.validation';
import { addProjectMutationFn, updateProjectMutationFn } from '@/libs/api';
import { ProjectType } from '@/types/api.type';
import useGetProjectById from '@/hooks/projects/use-get-projectById';
import { useOutletContext } from 'react-router';
import { ProjectFormProps } from '@/types/interface';

const ProjectForm: React.FC<ProjectFormProps> = ({
  id,
  initialValues,
  setProjectForm,
}) => {
  const toastRef = useRef<ToastMessageHandle>(null);
  const { data, isLoading, refetch } = useGetProjectById({ id });
  const projectData = data?.project;
  const { refetchUserDetails } = useOutletContext<{ refetchUserDetails: () => void }>();
  const addMutation = useMutation({ mutationFn: addProjectMutationFn });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectType }) =>
      updateProjectMutationFn(id, data),
  });

  const submitHandler = (values: typeof initialProject) => {
    if (addMutation.isPending || updateMutation.isPending) return;

    const isNew = !projectData || Object.keys(projectData).length === 0;

    const payload: ProjectType = {
      ...values,
      startDate: formateDateToISO(values.startDate),
      endDate: formateDateToISO(values.endDate),
      techStack: values.techStack.split(',').map((t) => t.trim()),
    };

    if (isNew || !projectData?._id) {
      addMutation.mutate(payload, {
        onSuccess: () => {
          toastRef.current?.showToast('Project added!', 'success');
          refetch();
          refetchUserDetails();
        },
        onError: () => {
          toastRef.current?.showToast('Error occurred while adding project.', 'error');
        },
      });
    } else {
      updateMutation.mutate(
        { id: projectData._id, data: payload },
        {
          onSuccess: () => {
            toastRef.current?.showToast('Project updated!', 'success');
            refetch();
          },
          onError: () => {
            toastRef.current?.showToast(
              'Error occurred while updating project.',
              'error'
            );
          },
        }
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: projectSchemaValidation,
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
            label="Project Name"
            name="projectName"
            value={formik.values.projectName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.projectName && !!formik.errors.projectName}
            helperText={
              typeof formik.errors.projectName === 'string' && formik.touched.projectName
                ? formik.errors.projectName
                : undefined
            }
          />
          <TextField
            label="Project URL"
            name="projectUrl"
            value={formik.values.projectUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.projectUrl && !!formik.errors.projectUrl}
            helperText={
              typeof formik.errors.projectUrl === 'string' && formik.touched.projectUrl
                ? formik.errors.projectUrl
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
              typeof formik.errors.startDate === 'string' && formik.touched.startDate
                ? formik.errors.startDate
                : undefined
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
              typeof formik.errors.endDate === 'string' && formik.touched.endDate
                ? formik.errors.endDate
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
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={
              typeof formik.errors.description === 'string' && formik.touched.description
                ? formik.errors.description
                : undefined
            }
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
              setProjectForm((prev) => {
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

export default ProjectForm;

