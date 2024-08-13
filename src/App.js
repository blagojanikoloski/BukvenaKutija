import React from 'react';
import Input from './Input';
import Box from './Box';
import { GameProvider, streak } from './context';

function App() {
  return (
    <GameProvider>
      <br />
      <br />
      <div className="title-container">
        <img src="./povrzi-logo.png" alt="Logo" className="povrzilogo" />
        <p className="streak">
          Моментална<br /> низа: {streak}
          {streak > 0 ? ' 🔥' : ''}
        </p>
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
