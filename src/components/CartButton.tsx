import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';
import { useGetCartQuery } from '../api/apiSlice';

const CartButton: React.FC = () => {
  const dispatch = useDispatch();
  const { data: cartData, isLoading, error } = useGetCartQuery();

  // API возвращает объект корзины
  const cart = cartData || null;
  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;


  if (isLoading) {
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
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
      </Box>
    );
  }

  if (error) {
    console.error('CartButton - error:', error);
    return null;
  }

  if (!cart || totalItems === 0) return null;

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
      }}
    >
      <Button
        fullWidth
        variant="contained"
        onClick={handleCartClick}
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
          Корзина ({totalItems}) • {cart?.total || 0} ₽
        </Typography>
      </Button>
    </Box>
  );
};

export default CartButton;