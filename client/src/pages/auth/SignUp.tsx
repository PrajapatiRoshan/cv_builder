import ToastMessage from '@/components/ui/ToastMessage.com';
import { registerMutationFn } from '@/libs/api';
import { AUTH_ROUTES } from '@/routes/common/routesPath';
import { ToastMessageHandle } from '@/types/interface';
import { signUpSchemaValidate } from '@/validations/auth.validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: registerMutationFn });
  const [showPassword, setShowpassword] = useState(false);
  const toastRef = useRef<ToastMessageHandle>(null);

  const submitHandler = (values: any) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (data) => {
        toastRef.current?.showToast(data?.message || 'Register successful!', 'success');
        setTimeout(() => {
          navigate(AUTH_ROUTES.SIGN_IN);
        }, 1500);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<any>;
        const message = axiosError.response?.data?.message || 'Invalid credentials!';
        toastRef.current?.showToast(message, 'error');
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchemaValidate,
    onSubmit: submitHandler,
  });

  return (
    <Box
      sx={{
        width: '520px',
        p: { xs: 2, sm: 4 },
        boxShadow: { xs: 'none', sm: 3 },
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
      alignItems="center"
      gap={1.5}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="name"
          label="Full name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowpassword((prev) => !prev)}
                    edge="end"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack spacing={2}>
          <Link
            color="inherit"
            to={AUTH_ROUTES.SIGN_IN}
            style={{ display: 'inline', width: 'auto', padding: 0, marginBottom: 1.5 }}
            onClick={() => {}}
          >
            Sign-in
          </Link>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            loading={isPending}
            sx={{ height: 56, fontSize: '1.3rem' }}
          >
            Register
          </LoadingButton>
        </Stack>
        <ToastMessage ref={toastRef} />
      </form>
    </Box>
  );
};

export default SignUp;

