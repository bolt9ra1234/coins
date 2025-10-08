import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography, CircularProgress } from '@mui/material';
import { useGetCategoriesQuery } from '../api/apiSlice';

interface CategorySelectProps {
  selectedCategory: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, onCategoryChange }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const handleChange = (value: string) => {
    const categoryId = value === 'all' ? undefined : Number(value);
    onCategoryChange(categoryId);
  };

  if (isLoading) {
    return (
      <Box sx={{ px: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={24} sx={{ color: '#DEB544' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#ff6b6b', textAlign: 'center' }}>
          Ошибка загрузки категорий
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <FormControl fullWidth>
        <Select
          value={selectedCategory?.toString() || 'all'}
          onChange={(e) => handleChange(e.target.value)}
          displayEmpty
          sx={{
            backgroundColor: '#191818',
            borderRadius: 3,
            height: 48,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2A2A2A',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DEB544',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E1B842',
            },
            '& .MuiSelect-select': {
              color: '#FFFFFF',
            },
            '& .MuiSvgIcon-root': {
              color: '#CCCCCC',
            },
          }}
        >
          <MenuItem value="all" sx={{ color: '#FFFFFF', backgroundColor: '#191818' }}>
            Все категории
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem 
              key={category.id} 
              value={category.id.toString()}
              sx={{ color: '#FFFFFF', backgroundColor: '#191818' }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;