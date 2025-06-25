import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router';
import img404 from '../assets/illustration-404.svg';

function NotFoundView() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      sx={{
        minHeight: '100dvh', // full height of viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: 240, sm: 480 },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
          }}
        >
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }} align="center">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the
          URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src={img404}
          alt="404 illustration"
          sx={{
            width: { xs: 200, sm: 320 },
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button
          component={Link}
          to="/"
          size={isSmall ? 'small' : 'large'}
          variant="contained"
          color="inherit"
        >
          Go to home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundView;

