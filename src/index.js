import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './context/DataContext'; // Update the path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider> {/* Wrap the App with DataProvider */}
      <App />
    </DataProvider>
  </React.StrictMode>
);

// Optional: Include for measuring performance
reportWebVitals();
