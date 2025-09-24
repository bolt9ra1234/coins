import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './theme';
import { store } from './store/store';
import Header from './components/Header';
import AppBanner from './components/AppBanner';
import SearchBar from './components/SearchBar';
import ProductCatalog from './components/ProductCatalog';
import CartButton from './components/CartButton';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: '#111111', pb: 10 }}>
          <Header />
          <AppBanner />
          <SearchBar onSearch={handleSearch} />
          <ProductCatalog searchQuery={searchQuery} />
          <CartButton />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;