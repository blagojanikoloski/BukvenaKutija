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
        <img src="./povrzi-logo.png" alt="Logo" className="povrzilogo" />
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
