import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';
import AuthState from "./context/auth/AuthState";
import ProductState from './context/product/ProductState';
// import ChatProvider from './context/chatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider >
    <BrowserRouter>
      <AuthState>
        <ProductState>
          <App />
          <Toaster />
        </ProductState>
      </AuthState>
    </BrowserRouter>
  </ChakraProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
