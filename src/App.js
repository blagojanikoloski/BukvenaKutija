import React from 'react';
import Input from './Input';
import Box from './Box';
import { GameProvider } from './context';

function App() {
  return (
    <GameProvider>
      <br />
      <br />
      <div className="title-container">
        <img src="./logo.png" alt="Logo" className="logo" />
        <h1>Зборовна Кутија</h1>
      </div>
      <div className="row">
        <Box />
      </div>
      <div className="row">
        <Input />
      </div>
    </GameProvider>
  );
}

export default App;
