import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Header: React.FC = () => {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: '#DEB544', fontWeight: 600 }}>
              999
            </Typography>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: '#DEB544',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#111111',
                fontWeight: 'bold'
              }}
            >
              +
            </Box>
          </Box>
          
          <IconButton sx={{ color: '#DEB544' }}>
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