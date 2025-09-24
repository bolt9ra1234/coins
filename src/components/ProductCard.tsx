import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  styled,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types/product';

const StyledCard = styled(Card)(({ theme }) => ({

  maxWidth: '100%',
  backgroundColor: '#191818',
  borderRadius: 50,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const GameTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 700,
  color: '#f5f5f5',
  fontSize: '18px',
  lineHeight: 1.2,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 400,
  color: '#f5f5f5',
  fontSize: '16px',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const BuyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 40,
  borderRadius: 35,
  backgroundColor: '#deb544',
  color: '#111111',
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 700,
  fontSize: '2rem',
  textTransform: 'none',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#c9a23d',
  },
}));

const DetailsButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 60,
  borderRadius: 35,
  backgroundColor: 'transparent',
  color: '#111111',
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 500,
  fontSize: '1.8rem',
  textTransform: 'none',
  border: '4px solid #000000',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const CoinIcon = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  objectFit: 'contain',
  marginRight: 15,
  display: 'block',
  marginBottom: theme.spacing(3),
}));

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    }));
  };
 
  return (
    <StyledCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

<Box
  component="img"
  src={product.image}
  alt={product.name}
  sx={{
    width: '100%',
    height: 'auto', // <-- автоматическая высота
    maxHeight: 250, // можно ограничить, чтобы карточка не была слишком большой
    borderRadius: 2,
    mb: 2,
    objectFit: 'contain', // не обрезает картинку
    backgroundColor: '#333',
  }}
  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
/>
        
        <GameTitle variant="h1">
          {product.name}
        </GameTitle>

         <Box sx={{display: 'flex', justifyContent: 'center', alignItems: "center" }}>
         <CoinIcon
          src={"/coin.png"}
          alt="Coin icon"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

           <PriceText variant="h2">
          {product.price} {product.currency}
        </PriceText>
         </Box>
        <BuyButton
          variant="contained"
          onClick={handleAddToCart}
        >
          Купить
        </BuyButton>
        
        <DetailsButton
          variant="outlined"
          onClick={() => console.log('Подробнее:', product.name)}
        >
          Подробнее
        </DetailsButton>
      </Box>
    </StyledCard>
  );
};

export default ProductCard;