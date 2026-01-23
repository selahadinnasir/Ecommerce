import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <ErrorBoundary>
            <HelmetProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </HelmetProvider>
          </ErrorBoundary>
        </Elements>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
