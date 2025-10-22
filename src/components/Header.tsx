import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';
import { useGetCartQuery } from '../api/apiSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { data: cartData, error } = useGetCartQuery();
  
  // API возвращает объект корзины
  const cart = cartData || null;
  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <Box position="static" sx={{ backgroundColor: '#111111', boxShadow: 'none', }}>
      <Toolbar sx={{ justifyContent: 'space-between', pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           <Box
        component="img"
        src="/logo.png" // 👉 сюда путь к твоей картинке
        alt="logo"
        sx={{
          maxWidth: 80,
          height: 80,
          borderRadius: '2px',
        }}
      />
          <Box>
            <Typography variant="h6" sx={{ color: '#E1B842', fontWeight: 700, fontSize: '18px' }}>
              DONATEWORLD
            </Typography>
            <Typography variant="body2" sx={{ color: '#CCCCCC', fontSize: '12px' }}>
              магазин игровой валюты
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>    
          <IconButton sx={{ color: '#DEB544' }} onClick={handleCartClick}>
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;