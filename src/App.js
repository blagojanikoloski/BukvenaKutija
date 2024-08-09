import React from 'react';
import Input from './Input';
import Box from './Box';
import { GameProvider } from './context';

function App() {
  return React.createElement(
    GameProvider,
    null,
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Box, null)
    ),
    React.createElement('br', null),
    React.createElement('br', null),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Input, null)
    )
  );
}

export default App;
