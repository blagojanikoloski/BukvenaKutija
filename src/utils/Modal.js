import React from 'react';

export default function Modal({ closeModal }) {
  return React.createElement(
    'div',
    { className: 'modal' },
    React.createElement(
      'div',
      null,
      React.createElement('p', null, '- Зборовите мора да бидат долги најмалку 3 букви'),
      React.createElement('p', null, '- Зборовите се формираат со допирање на буквите по редослед'),
      React.createElement('p', null, '- Последователните букви не можат да бидат од иста страна'),
      React.createElement('p', null, '- Последната буква од зборот станува првата буква од следниот збор'),
      React.createElement('p', null, '- Користете ги сите букви за да победите!'),
      React.createElement(
        'p',
        null,
        '- Играјте ја оригиналната игра ',
        React.createElement('a', { href: 'https://www.nytimes.com/puzzles/letter-boxed' }, 'овде')
      ),
      React.createElement('button', { onClick: closeModal }, 'Затвори'),

    )
  );
}
