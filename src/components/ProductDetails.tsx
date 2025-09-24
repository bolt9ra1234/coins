import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types/product';

// Временные данные товаров (те же что в каталоге)
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Игра - No Name',
    game: 'No Name',
    price: 2000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Игровая валюта для популярной игры No Name. Получите преимущество в игре с нашей надежной и быстрой доставкой валюты. Все транзакции безопасны и проходят мгновенно.'
  },
  {
    id: 2,
    name: 'Игра - No Name',
    game: 'No Name',
    price: 2000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Игровая валюта для популярной игры No Name. Получите преимущество в игре с нашей надежной и быстрой доставкой валюты. Все транзакции безопасны и проходят мгновенно.'
  },
  {
    id: 3,
    name: 'World of Warcraft Gold',
    game: 'World of Warcraft',
    price: 1500,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Золото для World of Warcraft. Быстрая доставка золота на ваш сервер. Мы гарантируем безопасность сделки и конфиденциальность ваших данных.'
  },
  {
    id: 4,
    name: 'Fortnite V-Bucks',
    game: 'Fortnite',
    price: 1000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'В-баксы для Fortnite. Покупайте скины, эмоции и другие предметы в игре. Мгновенное пополнение баланса после оплаты.'
  },
  {
    id: 5,
    name: 'CS:GO Skin Pack',
    game: 'Counter-Strike',
    price: 3000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Набор скинов для CS:GO. Эксклюзивные скины для оружия, которые сделают вас заметным на поле боя. Все скины проверены и безопасны.'
  },
  {
    id: 6,
    name: 'Dota 2 Items',
    game: 'Dota 2',
    price: 2500,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Предметы для Dota 2. Редкие и эпические предметы для ваших любимых героев. Улучшите внешний вид персонажей и покажите свой стиль.'
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
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
          <ArrowBack />
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
            src={product.image}
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

            {/* Игра */}
            <Typography
              variant="body2"
              sx={{
                color: '#CCCCCC',
                mb: 3,
                textAlign: 'center',
              }}
            >
              {product.game}
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
                {product.price} {product.currency}
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