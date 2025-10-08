import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { store } from './store/store';
import Header from './components/Header';
import AppBanner from './components/AppBanner';
import CategorySelect from './components/CategorySelect';
import ProductCatalog from './components/ProductCatalog';
import CartButton from './components/CartButton';
import ProductDetails from './components/ProductDetails';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', pb: 10 }}>
                  <Header />
                  <AppBanner />
                  <CategorySelect selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                  <ProductCatalog selectedCategory={selectedCategory} />
                  <CartButton />
                </Box>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;