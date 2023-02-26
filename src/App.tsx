import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Box, CssBaseline, Typography } from '@mui/material';

import './App.css';

import { TopBar } from './component/topBar';
import { NytApiKeyContext } from './context/nytApiKey';
import { BookRoutes } from './component/route';
import { pathToTitle } from './utils';

const queryClient = new QueryClient();
function App() {
  const [apiKey, setApiKey] = useState('');
  const location = useLocation();
  console.log('location : ', location);

  return (
    <>
      <CssBaseline />

      <NytApiKeyContext.Provider value={{ apiKey, setApiKey }}>
        <QueryClientProvider client={queryClient}>
          <Box component="nav">
            <TopBar />

            {location.key !== 'default' ? (
              <Typography
                align="center"
                variant="h3"
                style={{ padding: '15px' }}
              >
                {location.pathname !== '/'
                  ? pathToTitle(location.pathname)
                  : 'Best Sellers'}
              </Typography>
            ) : null}

            <BookRoutes />
          </Box>
        </QueryClientProvider>
      </NytApiKeyContext.Provider>
    </>
  );
}

export default App;
