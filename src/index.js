import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ItemsContextProvider } from './context/ItemsContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <ItemsContextProvider>
        <App />
      </ItemsContextProvider>
    </React.StrictMode>
  </AuthContextProvider>
  
);
