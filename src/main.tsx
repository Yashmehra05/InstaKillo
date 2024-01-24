import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import AuthProvider from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
   <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
   </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>

)
