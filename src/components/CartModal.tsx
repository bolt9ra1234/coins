import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Divider,
} from '@mui/material';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeCart } from '../store/cartSlice';
import {
  useGetCartQuery,
  useIncreaseCartItemMutation,
  useDecreaseCartItemMutation,
  useRemoveFromCartMutation,
} from '../api/apiSlice';

interface CartModalProps {
  open: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ open }) => {
  const dispatch = useDispatch();
  const { data: cartData, isLoading, error } = useGetCartQuery();
  const [increaseItem] = useIncreaseCartItemMutation();
  const [decreaseItem] = useDecreaseCartItemMutation();
  const [removeItem] = useRemoveFromCartMutation();

  // API возвращает объект корзины
  const cart = cartData || null;

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleIncrease = async (itemId: number) => {
    try {
      await increaseItem(itemId).unwrap();
    } catch (error) {
      console.error('Ошибка увеличения количества:', error);
    }
  };

  const handleDecrease = async (itemId: number) => {
    try {
      await decreaseItem(itemId).unwrap();
    } catch (error) {
      console.error('Ошибка уменьшения количества:', error);
    }
  };

  const handleRemove = async (itemId: number) => {
    try {
      await removeItem(itemId).unwrap();
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#191818',
          color: '#FFFFFF',
          borderRadius: 3,
          border: '1px solid #2A2A2A',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#DEB544', fontWeight: 600 }}>
          Корзина
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: '#CCCCCC' }}>
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress sx={{ color: '#DEB544' }} />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="body1" sx={{ color: '#ff6b6b' }}>
              Ошибка загрузки корзины
            </Typography>
          </Box>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="body1" sx={{ color: '#CCCCCC' }}>
              Корзина пуста
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {cart.items.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ px: 3, py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                        {item.product_name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
                        {item.price} ₽ × {item.quantity} = {item.total_price} ₽
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleDecrease(item.id)}
                        sx={{ color: '#DEB544', backgroundColor: '#2A2A2A' }}
                      >
                        <Minus size={16} />
                      </IconButton>
                      
                      <Typography variant="body2" sx={{ color: '#FFFFFF', minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        size="small"
                        onClick={() => handleIncrease(item.id)}
                        sx={{ color: '#DEB544', backgroundColor: '#2A2A2A' }}
                      >
                        <Plus size={16} />
                      </IconButton>
                      
                      <IconButton
                        size="small"
                        onClick={() => handleRemove(item.id)}
                        sx={{ color: '#ff6b6b', backgroundColor: '#2A2A2A', ml: 1 }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < cart.items.length - 1 && <Divider sx={{ backgroundColor: '#2A2A2A' }} />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      {cart && cart.items.length > 0 && (
        <DialogActions sx={{ flexDirection: 'column', gap: 2, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
              Итого:
            </Typography>
            <Typography variant="h6" sx={{ color: '#DEB544', fontWeight: 700 }}>
              {cart.total} ₽
            </Typography>
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#DEB544',
              color: '#111111',
              height: 48,
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#E1B842',
              },
            }}
          >
            Оформить заказ
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CartModal;