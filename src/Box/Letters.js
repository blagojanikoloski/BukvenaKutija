import React from 'react';
import { useGame } from '../context';

const offset = 125;

function Letter({ letter, x, y }) {
  const [state, setState] = useGame();
  const { currentGuess } = state;

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess"
    });
  }

  return (
    <text
      onClick={addLetter}
      x={x}
      y={y}
      className="" // Add CSS class if needed
    >
      {letter}
    </text>
  );
}

function Set({ letters, placement }) {
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

  return (
    <g>
      {letters.map((letter, i) => (
        <Letter
          key={i}
          x={placement === 'top' || placement === 'bottom' ? offsetMultiplier(i) : xBase}
          y={placement === 'left' || placement === 'right' ? offsetMultiplier(i) : yBase}
          letter={letter}
        />
      ))}
    </g>
  );
}

export default function Letters() {
  const [state] = useGame();
  const { letters } = state;

  return (
    <g>
      <Set letters={letters[0]} placement="top" />
      <Set letters={letters[1]} placement="left" />
      <Set letters={letters[2]} placement="right" />
      <Set letters={letters[3]} placement="bottom" />
    </g>
  );
}
