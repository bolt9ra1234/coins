import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { store, RootState } from './store/store';
import Header from './components/Header';
import AppBanner from './components/AppBanner';
import CategorySelect from './components/CategorySelect';
import ProductCatalog from './components/ProductCatalog';
import CartButton from './components/CartButton';
import CartModal from './components/CartModal';
import ProductDetails from './components/ProductDetails';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const isCartOpen = useSelector((state: RootState) => state.cartUI.isOpen);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  return (
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
                <CartModal open={isCartOpen} />
              </Box>
            }
          />
          <Route path="/product/:id" element={
             <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', pb: 10 }}>
          <ProductDetails />
               </Box>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;