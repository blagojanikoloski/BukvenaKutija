import React from 'react';
import { useGame } from '../context';

function deriveClass(letter, state) {
  const { currentGuess, existingWords } = state;
  const lastLetter = currentGuess.slice(-1);

  if (lastLetter === letter) {
    return "lead";
  }
  if (currentGuess.includes(letter)) {
    return "active";
  }
  if (existingWords.some(word => word.includes(letter))) {
    return "past";
  }
  return ""; // Ensure there is a default return value
}

function Circle(props) {
  const { letter } = props;
  const [state, setState] = useGame();
  const { letterMap, currentGuess } = state;

  // Ensure letterMap has the letter key
  const [x = 0, y = 0] = letterMap[letter] || [];
  const className = deriveClass(letter, state);

  function addLetter() {
    setState({
      currentGuess: currentGuess + letter,
      intent: "guess"
    });
  }

  return React.createElement(
    'circle',
    {
      onClick: addLetter,
      cx: x,
      cy: y,
      r: 12,
      className: className
    }
  );
}

export default function Circles() {
  const [state] = useGame();
  const { letters } = state;

  return React.createElement(
    'g',
    null,
    letters.flat().map((letter, i) => 
      React.createElement(Circle, { letter: letter, key: i })
    )
  );
}
