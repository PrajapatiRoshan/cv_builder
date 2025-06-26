import { Typography, TextField, Box } from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/config.store';
import { useMutation } from '@tanstack/react-query';
import { loginMutationFn } from '@/libs/api';
import { useRef, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setAccessToken, setUser } from '@/store/auth-store';
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/routes/common/routesPath';
import { loginSchemaValidate } from '@/validations/auth.validation';
import ToastMessage from '@/components/ui/ToastMessage.com';
import GoogleOauthButton from '@/components/auth/google-auth.botton';
import { ToastMessageHandle } from '@/types/interface';

const initialValues = {
  email: '',
  password: '',
};

const SignInView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending } = useMutation({ mutationFn: loginMutationFn });
  const [showPassword, setShowpassword] = useState(false);
  const toastRef = useRef<ToastMessageHandle>(null);

  const submitHandler = (values: any) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (data) => {
        const accessToekn = data.access_token;
        const user = data.user;
        dispatch(setAccessToken(accessToekn));
        dispatch(setUser(user));
        toastRef.current?.showToast('Login successful!', 'success');
        setTimeout(() => {
          const decodeUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
          navigate(decodeUrl || PROTECTED_ROUTES.USER);
        }, 1500);
      },
      onError: (error) => {
        console.log(error);
        toastRef.current?.showToast('Invalid credentials!', 'error');
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchemaValidate,
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
    >
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4">Sign in</Typography>
        <GoogleOauthButton label="Login" />
        <Typography variant="body2" color="text.secondary">
          Don&apos;t have an account?
          <Link to={AUTH_ROUTES.SIGN_UP} style={{ marginLeft: 8 }} color="inherit">
            Get started
          </Link>
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
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
            to="forgot-password"
            style={{ display: 'inline', width: 'auto', padding: 0, marginBottom: 1.5 }}
            onClick={() => {}}
          >
            Forgot password?
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
            Sign in
          </LoadingButton>
        </Stack>
      </form>
      <ToastMessage ref={toastRef} />
    </Box>
  );
};

export default SignInView;

