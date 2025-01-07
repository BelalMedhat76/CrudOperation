import React from 'react';
import DataGrid from './components/DataGrid';
import { DataProvider } from './context/DataContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css'
const App = () => {
  return (
    <DataProvider>
      <ErrorBoundary>
        <DataGrid />
      </ErrorBoundary>
    </DataProvider>
  );
};

export default App;
