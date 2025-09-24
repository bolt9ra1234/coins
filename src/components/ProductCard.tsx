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
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types/product';

const StyledCard = styled(Card)(({ theme }) => ({
  flex: 1,
  maxWidth: '100%',
  backgroundColor: '#191818',
  borderRadius: 50,
  overflow: 'hidden',
  position: 'relative',
  minHeight: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const GameTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 600,
  color: '#f5f5f5',
  fontSize: '14px',
  lineHeight: 1.2,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    marginBottom: theme.spacing(1),
  },
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 400,
  color: '#f5f5f5',
  fontSize: '12px',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    marginBottom: theme.spacing(1),
  },
}));

const BuyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 32,
  borderRadius: 35,
  backgroundColor: '#deb544',
  color: '#111111',
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 700,
  fontSize: '0.8rem',
  textTransform: 'none',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: 28,
    fontSize: '0.7rem',
    marginBottom: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: '#c9a23d',
  },
}));

const DetailsButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 32,
  borderRadius: 35,
  backgroundColor: 'transparent',
  color: '#111111',
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 500,
  fontSize: '0.7rem',
  textTransform: 'none',
  border: '4px solid #000000',
  [theme.breakpoints.down('sm')]: {
    height: 28,
    fontSize: '0.6rem',
    border: '2px solid #000000',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const CoinIcon = styled('img')(({ theme }) => ({
  width: 16,
  height: 16,
  objectFit: 'contain',
  marginRight: 8,
  display: 'block',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: 14,
    height: 14,
    marginBottom: theme.spacing(1),
  },
}));

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

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
  src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400"
  alt={product.name}
  sx={{
    width: '100%',
    height: 100,   
    maxWidth: '100%',
    borderRadius: 2,
    mb: 2,
    objectFit: 'cover',
    backgroundColor: '#333',
    [theme.breakpoints.down('sm')]: {
      height: 80,
      mb: 1,
    },
  }}
  onError={(e) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
  }}
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