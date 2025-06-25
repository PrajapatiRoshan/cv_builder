import { Box } from '@mui/material';

const HoverCard = ({
  img,
  hoverText,
  onClick,
  disable,
}: {
  img: string;
  hoverText: string;
  onClick?: () => void;
  disable?: boolean;
}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', opacity: `${disable ? 0.4 : 1}` }}>
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 250,
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: 1,
          '&:hover .hoverOverlay': {
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
        <Box
          className="hoverOverlay"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: '999px',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {hoverText}
        </Box>
      </Box>
    </div>
  );
};

export default HoverCard;

