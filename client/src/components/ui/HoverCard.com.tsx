import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const HoverCard = ({
  img,
  onClick,
  delClick,
  disable,
  newCv,
}: {
  img: string;
  onClick?: () => void;
  delClick?: () => void;
  disable?: boolean;
  newCv: boolean;
}) => (
  <div
    // onClick={onClick}
    style={{ cursor: disable ? 'default' : 'pointer', opacity: disable ? 0.4 : 1 }}
  >
    <Box
      sx={{
        position: 'relative',
        width: 200,
        height: 250,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: disable ? 'default' : 'pointer',
        boxShadow: 1,
        '&:hover .hoverButtons': {
          opacity: 1,
          pointerEvents: 'auto',
        },
      }}
    >
      <img
        src={img}
        alt="preview"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {!disable && (
        <Box
          className="hoverButtons"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 1,
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            bgcolor: 'rgba(0,0,0,0.7)',
            borderRadius: 10,
            px: 1,
            py: 0.5,
          }}
        >
          {newCv && (
            <IconButton
              size="large"
              aria-label="edit"
              sx={{
                color: 'white',
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
              }}
              onClick={onClick}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}
          {!newCv && (
            <>
              <IconButton
                size="large"
                aria-label="edit"
                sx={{
                  color: 'white',
                  bgcolor: 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
                }}
                onClick={onClick}
              >
                <EditIcon fontSize="large" />
              </IconButton>

              <IconButton
                size="large"
                aria-label="delete"
                sx={{
                  color: 'white',
                  bgcolor: 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
                }}
                onClick={delClick}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </Box>
  </div>
);

export default HoverCard;

