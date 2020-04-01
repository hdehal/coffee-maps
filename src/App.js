import React from 'react';
import './App.css';
import Header from './components/header';
import CoffeeMap from './components/map.js';

function App() {
  return (
    <div className="App">
      <Header />
      <CoffeeMap />
    </div>
  );
}

export default App;
