import { useEffect, useState } from 'react';
import { Box, MenuItem, TextField, Typography } from '@mui/material';

const fontOptions = ['Arial', 'Roboto', 'Helvetica', 'Times New Roman', 'Courier New'];

interface EditorFontSettingsProps {
  fSize?: number;
  fFamily?: string;
  fColor?: string;
}

interface EditorFontSettingsComponentProps extends EditorFontSettingsProps {
  onChange: (data: EditorFontSettingsProps) => void;
}

const EditorFontSettings = ({
  fSize = 14,
  fFamily = 'Arial',
  fColor = '#000000',
  onChange,
}: EditorFontSettingsComponentProps) => {
  const [modelObj, setModelObj] = useState<EditorFontSettingsProps>({
    fSize,
    fFamily,
    fColor,
  });

  useEffect(() => {
    setModelObj({ fSize, fFamily, fColor });
  }, [fSize, fFamily, fColor]);

  const handleChange = (key: keyof EditorFontSettingsProps, value: string | number) => {
    const updated = { ...modelObj, [key]: value };
    setModelObj(updated);
    onChange(updated);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        Font Settings:
      </Typography>

      <TextField
        label="Size"
        type="number"
        size="small"
        value={modelObj.fSize}
        onChange={(e) => handleChange('fSize', Number(e.target.value))}
        sx={{ width: 100 }}
      />

      <TextField
        label="Family"
        select
        size="small"
        value={modelObj.fFamily}
        onChange={(e) => handleChange('fFamily', e.target.value)}
        sx={{ width: 150 }}
      >
        {fontOptions.map((font) => (
          <MenuItem key={font} value={font}>
            {font}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Color"
        type="color"
        size="small"
        value={modelObj.fColor}
        onChange={(e) => handleChange('fColor', e.target.value)}
        sx={{ width: 100 }}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default EditorFontSettings;

