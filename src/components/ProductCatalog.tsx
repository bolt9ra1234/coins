import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

// Временные данные товаров
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Игра - No Name',
    game: 'No Name',
    price: 2000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Игровая валюта для No Name'
  },
  {
    id: 2,
    name: 'Игра - No Name',
    game: 'No Name',
    price: 2000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Игровая валюта для No Name'
  },
  {
    id: 3,
    name: 'World of Warcraft Gold',
    game: 'World of Warcraft',
    price: 1500,
    currency: '₽',
    image: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Золото для WoW'
  },
  {
    id: 4,
    name: 'Fortnite V-Bucks',
    game: 'Fortnite',
    price: 1000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'В-баксы для Fortnite'
  },
  {
    id: 5,
    name: 'CS:GO Skin Pack',
    game: 'Counter-Strike',
    price: 3000,
    currency: '₽',
    image: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Набор скинов для CS:GO'
  },
  {
    id: 6,
    name: 'Dota 2 Items',
    game: 'Dota 2',
    price: 2500,
    currency: '₽',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Предметы для Dota 2'
  },
];

interface ProductCatalogProps {
  searchQuery: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ searchQuery }) => {
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return mockProducts;
    
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.game.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
        Каталог
      </Typography>
      
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" sx={{ color: '#CCCCCC' }}>
            Товары не найдены
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductCatalog;