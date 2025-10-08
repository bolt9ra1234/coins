import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useGetProductQuery, useGetCategoriesQuery } from '../api/apiSlice';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading: productLoading, error: productError } = useGetProductQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery();

  const categoryName = useMemo(() => {
    if (!product || !categories) return '';
    const category = categories.find(cat => cat.id === product.category_id);
    return category?.name || '';
  }, [product, categories]);

  if (productLoading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: '#DEB544' }} />
      </Box>
    );
  }

  if (productError) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#ff6b6b', mb: 2 }}>
          Ошибка загрузки товара
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#DEB544',
            color: '#111111',
            '&:hover': {
              backgroundColor: '#E1B842',
            },
          }}
        >
          Вернуться к каталогу
        </Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
          Товар не найден
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#DEB544',
            color: '#111111',
            '&:hover': {
              backgroundColor: '#E1B842',
            },
          }}
        >
          Вернуться к каталогу
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    }));
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', pb: 10 }}>
      {/* Header с кнопкой назад */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={handleBack}
          sx={{
            color: '#DEB544',
            backgroundColor: '#191818',
            '&:hover': {
              backgroundColor: '#2A2A2A',
            },
          }}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
          Подробности товара
        </Typography>
      </Box>

      {/* Контент */}
      <Box sx={{ px: 2 }}>
        <Card
          sx={{
            backgroundColor: '#191818',
            borderRadius: 3,
            border: '1px solid #2A2A2A',
            overflow: 'hidden',
          }}
        >
          {/* Изображение товара */}
          <Box
            component="img"
            src={product.image_url}
            alt={product.name}
            sx={{
              width: '100%',
              height: 250,
              objectFit: 'cover',
              backgroundColor: '#333',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          <CardContent sx={{ p: 3 }}>
            {/* Название */}
            <Typography
              variant="h5"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                mb: 1,
                textAlign: 'center',
              }}
            >
              {product.name}
            </Typography>

            {/* Категория */}
            <Typography
              variant="body2"
              sx={{
                color: '#CCCCCC',
                mb: 3,
                textAlign: 'center',
              }}
            >
              {categoryName}
            </Typography>

            {/* Цена */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <Box
                component="img"
                src="/coin.png"
                alt="Coin icon"
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: '#DEB544',
                  fontWeight: 700,
                }}
              >
                {product.price} ₽
              </Typography>
            </Box>

            {/* Описание */}
            <Typography
              variant="body1"
              sx={{
                color: '#FFFFFF',
                mb: 4,
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              {product.description}
            </Typography>

            {/* Кнопка купить */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: '#DEB544',
                color: '#111111',
                height: 50,
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: '#E1B842',
                },
              }}
            >
              Купить
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductDetails;