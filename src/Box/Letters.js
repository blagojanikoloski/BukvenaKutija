import React from 'react';
import { useGame } from '../context';

const offset = 125;

function Letter(props) {
  const { letter, x, y } = props;
  const [state, setState] = useGame();
  const { currentGuess } = state;

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess"
    });
  }

  return React.createElement(
    'text',
    {
      onClick: addLetter,
      x: x,
      y: y,
      className: '' // Add CSS class if needed
    },
    letter
  );
}

function Set(props) {
  const { letters, placement } = props;

  let xBase, yBase, offsetMultiplier;
  
  switch (placement) {
    case 'top':
      xBase = 300;
      yBase = 55;
      offsetMultiplier = (i) => xBase + (offset * (i - 1));
      break;
    case 'left':
      xBase = 40;
      yBase = 320;
      offsetMultiplier = (i) => yBase + (offset * (i - 1));
      break;
    case 'right':
      xBase = 560;
      yBase = 320;
      offsetMultiplier = (i) => yBase + (offset * (i - 1));
      break;
    case 'bottom':
      xBase = 300;
      yBase = 585;
      offsetMultiplier = (i) => xBase + (offset * (i - 1));
      break;
    default:
      return null;
  }

  return React.createElement(
    'g',
    null,
    letters.map((letter, i) =>
      React.createElement(Letter, {
        key: i,
        x: placement === 'top' || placement === 'bottom' ? offsetMultiplier(i) : xBase,
        y: placement === 'left' || placement === 'right' ? offsetMultiplier(i) : yBase,
        letter: letter
      })
    )
  );
}

export default function Letters() {
  const [state] = useGame();
  const { letters } = state;

  return React.createElement(
    'g',
    null,
    React.createElement(Set, { letters: letters[0], placement: "top" }),
    React.createElement(Set, { letters: letters[1], placement: "left" }),
    React.createElement(Set, { letters: letters[2], placement: "right" }),
    React.createElement(Set, { letters: letters[3], placement: "bottom" })
  );
}
