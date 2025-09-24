import React from 'react';
import { Box, Typography } from '@mui/material';

const AppBanner: React.FC = () => {
   return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Box
        component="img"
        src="/hero.png" // 👉 сюда путь к твоей картинке
        alt="Hero"
        sx={{
          width: '100%',
          maxWidth: 400,
          height: 250,
          borderRadius: '20px',
        }}
      />
    </Box>
  )
};

export default AppBanner;