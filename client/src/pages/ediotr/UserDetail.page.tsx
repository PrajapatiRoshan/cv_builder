import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { userDetailSchemaValidation } from '@/validations/editor.validation';
import EditorFontSettings from '@/components/ui/EditorFontSettings';
import { TABLIST } from '@/components/ui/TabSideBar';
import { useMutation } from '@tanstack/react-query';
import { createUSerDetailMutationFn, updateUserDetailMutationFn } from '@/libs/api';
import ToastMessage, { ToastMessageHandle } from '@/components/ui/ToastMessage.com';
import useGetUserDetailQuery from '@/hooks/userdetail/use-get-userDetail';
import { formatDateToInput, formateDateToISO } from '@/utility/helper';

const initialValues = {
  address: '',
  countryCode: 91,
  phone: '',
  city: '',
  state: '',
  pincode: '',
  dob: new Date(),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '',
  summary: '',
};

const UserDetailPage = () => {
  const toastRef = useRef<ToastMessageHandle>(null);
  const { data, isLoading, refetch } = useGetUserDetailQuery({});

  const userData = data?.detail;
  const createMutation = useMutation({ mutationFn: createUSerDetailMutationFn });
  const updateMutation = useMutation({ mutationFn: updateUserDetailMutationFn });

  const submitHandler = (values: any) => {
    if (createMutation.isPending || updateMutation.isPending) return;

    const isNew = !userData || Object.keys(userData).length === 0;

    const mutationFn = isNew ? createMutation.mutate : updateMutation.mutate;

    const formattedDob = values.dob ? formateDateToISO(values.dob) : '';

    const payload = {
      ...values,
      dob: formattedDob,
    };

    mutationFn(payload, {
      onSuccess: (data) => {
        toastRef.current?.showToast(data.message || 'Success!', 'success');
        refetch();
      },
      onError: (error) => {
        toastRef.current?.showToast(error?.message || 'Something went wrong!', 'error');
      },
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData || initialValues,
    validationSchema: userDetailSchemaValidation,
    onSubmit: submitHandler,
  });

  return (
    <>
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
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h5" mb={3} mt={3}>
          {TABLIST[0].label}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
            {/* Column 1 */}
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                type="number"
              />
              <TextField
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />

              <TextField
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && !!formik.errors.state}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Box>

            {/* Column 2 */}
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formatDateToInput(formik.values.dob)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dob && !!formik.errors.dob}
                helperText={
                  formik.touched.dob && typeof formik.errors.dob === 'string'
                    ? formik.errors.dob
                    : ''
                }
              />
              <TextField
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && !!formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
              />

              <TextField
                label="Pincode"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && !!formik.errors.pincode}
                helperText={formik.touched.pincode && formik.errors.pincode}
                type="number"
              />
            </Box>
          </Box>

          <TextField
            label="Summary"
            name="summary"
            multiline
            rows={8}
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.summary && !!formik.errors.summary}
            helperText={formik.touched.summary && formik.errors.summary}
            fullWidth
            sx={{
              marginTop: 3,
            }}
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={4} justifyContent="center">
            <Button
              type="reset"
              variant="outlined"
              disabled={isLoading}
              onClick={() => formik.resetForm()}
            >
              Reset
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {userData ? 'update' : 'Add'}
            </LoadingButton>
          </Stack>
        </form>
      </Box>

      <ToastMessage ref={toastRef} />
    </>
  );
};

export default UserDetailPage;

