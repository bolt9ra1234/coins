import React from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../api/apiSlice';

interface ProductCatalogProps {
  selectedCategory: number | undefined;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ selectedCategory }) => {
  const { data: products, isLoading, error } = useGetProductsQuery(selectedCategory);

  if (isLoading) {
    return (
      <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: '#DEB544' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, pb: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body1" sx={{ color: '#ff6b6b' }}>
          Ошибка загрузки товаров
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
        Каталог
      </Typography>
      
     <Grid container spacing={2}>
  {products?.map((product) => (
    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>

      {products?.length === 0 && (
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