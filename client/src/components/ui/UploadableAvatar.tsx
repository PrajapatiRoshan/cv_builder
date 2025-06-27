import { useRef, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const UploadableAvatar = ({
  initialImage,
  userName,
  onUpload,
  imgURL,
}: {
  initialImage?: string;
  userName?: string;
  onUpload: (base64: string) => void;
  imgURL?: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String); // for preview
      onUpload(base64String); // send to backend
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 100,
        height: 100,
        '&:hover .uploadOverlay': {
          opacity: 1,
          pointerEvents: 'auto',
        },
      }}
    >
      <Avatar sx={{ width: 100, height: 100 }} src={previewImage || imgURL || undefined}>
        {!previewImage && userName?.charAt(0).toUpperCase()}
      </Avatar>

      <Box
        className="uploadOverlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.5)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          cursor: 'pointer',
        }}
        onClick={() => inputRef.current?.click()}
      >
        <CameraAltIcon />
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default UploadableAvatar;

