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
      { className: 'title-container' },
      React.createElement('img', { src: './logo.png', alt: 'Logo', className: 'logo' }),
      React.createElement('h1', null, 'Зборовна Кутија')
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Box, null)
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Input, null)
    )
  );
}

export default App;
