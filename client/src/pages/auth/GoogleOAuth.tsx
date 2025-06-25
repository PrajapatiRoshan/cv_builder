import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store/config.store';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/store/auth-store';

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const accessToken = params.get('access_token');
  const currentWorkspace = params.get('current_workspace');

  useEffect(() => {
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
      if (currentWorkspace) {
        navigate(`/workspace/${currentWorkspace}`);
      } else {
        navigate('/');
      }
    }
  }, [accessToken, currentWorkspace, navigate]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          Cv Builder
        </Link>
        <div className="flex flex-col gap-6"></div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Authentication Failed</h1>
        <p>We couldn't sign you in with Google. Please try again.</p>
        <Button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default GoogleOAuth;

