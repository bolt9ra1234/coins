import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAddToCartMutation } from '../api/apiSlice';
import { Product } from '../types/product';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',           // важно, чтобы занимала ширину Grid item
  height: '100%',          // растягивается по высоте Grid item
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: 15,
  backgroundColor: '#191818',
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
  fontSize: '16px',
  textTransform: 'none',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#c9a23d',
  },
}));

const DetailsButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 40,
  borderRadius: 35,
  backgroundColor: 'transparent',
  color: '#f5f5f5',
  fontFamily: 'Inknut Antiqua, serif',
  fontWeight: 700,
  fontSize: '16px',
  textTransform: 'none',
  border: '2px solid #f5f5f5',
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
  const navigate = useNavigate();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        product_id: product.id,
        quantity: 1,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
    }
  };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation(); // <-- предотвращает срабатывание handleShowDetails
  // здесь логика кнопки
};
 
  const handleShowDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <StyledCard onClick={handleShowDetails}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

<Box
  sx={{
    width: "145px",           // занимает всю ширину карточки
               // фиксированная высота для всех изображений
    aspectRatio: '1 / 1',    // фиксированное соотношение сторон
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 2,
    overflow: 'hidden',
    mb: 2,
       '@media (max-width:374px)': {
      width: '100%',          // на узких экранах 100%
    },
  }}
>
  <Box
    component="img"
    src={product.image_url}
    alt={product.name}
    sx={{
      maxWidth: '100%',       // растягивается по ширине контейнера
      maxHeight: '100%',      // не выходит за пределы контейнера
      objectFit: 'contain',   // сохраняет пропорции
      display: 'block',
    }}
    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
  />
</Box>
        
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
          {product.price} ₽
        </PriceText>
         </Box>
        <BuyButton
          variant="contained"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Добавление...' : 'Купить'}
        </BuyButton>
        
        <DetailsButton
          variant="outlined"
          onClick={handleShowDetails}
        >
          Подробнее
        </DetailsButton>
      </Box>
    </StyledCard>
  );
};

export default ProductCard;