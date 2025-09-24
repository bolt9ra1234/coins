import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CartButton: React.FC = () => {
  const { items, totalItems } = useSelector((state: RootState) => state.cart);

  if (totalItems === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#8B0000',
        p: 2,
        borderTop: '1px solid #2A2A2A',
      }}
    >
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#8B0000',
          color: '#FFFFFF',
          height: 48,
          fontSize: '16px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#A52A2A',
          },
        }}
      >
        <Typography variant="body1">
          Корзина ({totalItems})
        </Typography>
      </Button>
    </Box>
  );
};

export default CartButton;