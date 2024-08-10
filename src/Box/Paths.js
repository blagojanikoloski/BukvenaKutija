import React from 'react';
import { useGame } from '../context';

function Path({ word, current = false }) {
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

  return (
    <g>
      {paths.map((d, i) => (
        <path
          d={d}
          className={current ? 'active' : 'past'}
          key={i}
        />
      ))}
    </g>
  );
}

export default function Paths() {
  const [state] = useGame();
  const { existingWords, currentGuess } = state;

  return (
    <g>
      {existingWords.map((word, i) => (
        <Path word={word} key={i} />
      ))}
      <Path word={currentGuess} current={true} />
    </g>
  );
}
