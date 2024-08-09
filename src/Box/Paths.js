import React from 'react';
import { useGame } from '../context';

function Path(props) {
  const { word, current = false } = props;

  // Ensure this is at the top level of your component
  const [state] = useGame();
  const { letterMap } = state;

  if (word.length < 2) {
    return null;
  }

  const paths = [];
  for (let i = 1; i < word.length; i++) {
    const [x1, y1] = letterMap[word[i - 1]];
    const [x2, y2] = letterMap[word[i]];
    paths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
  }

  return React.createElement(
    'g',
    null,
    paths.map((d, i) =>
      React.createElement('path', {
        d: d,
        className: current ? 'active' : 'past',
        key: i
      })
    )
  );
}

export default function Paths() {
  // Ensure this is at the top level of your component
  const [state] = useGame();
  const { existingWords, currentGuess } = state;

  const pastWords = existingWords.map((word, i) =>
    React.createElement(Path, { word: word, key: i })
  );

  const currentWord = React.createElement(Path, { word: currentGuess, current: true });

  return React.createElement(
    'g',
    null,
    pastWords,
    currentWord
  );
}
