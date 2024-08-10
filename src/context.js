import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadWords, letters } from './utils';

const circleCoordinates = [
  [175, 100],
  [300, 100],
  [425, 100],
  [100, 175],
  [100, 300],
  [100, 425],
  [500, 175],
  [500, 300],
  [500, 425],
  [175, 500],
  [300, 500],
  [425, 500]
];

const baseGame = {
  currentGuess: "",
  existingWords: [],
  error: "",
  intent: "",
  letters,
  letterMap: generateMap(letters),
  won: false,
  help: false,
  __debug: false,
  loading: true
};

function generateMap(letterList) {
  const map = {};
  letterList.forEach((row, i) => {
    row.forEach((letter, j) => {
      map[letter] = [...circleCoordinates[i * 3 + j], i];
    });
  });
  return map;
}

const Game = createContext(baseGame);
export const useGame = () => useContext(Game);

const macedonianCyrillicRegex = /^[А-БВГДЃЕЖЗЅИЈКЛЉМНЊОПРСТЌУФХЦЧЏШа-бвгдѓежзѕијклљмнњопрстќуфхцчџш\s]+$/;

function checkForErrors(change, state) {
  if (change.intent === "guess") {
    if (!macedonianCyrillicRegex.test(change.currentGuess) && change.currentGuess !== "") {
      return "Внесувајте само кирилични букви!";
    }
    const lastLetter = change.currentGuess.charAt(change.currentGuess.length - 1);

    if (!state.letterMap[lastLetter] && change.currentGuess.length > 0) {
      return "Нема таква буква на таблата!";
    }

    if (change.currentGuess.length <= 1) {
      return false;
    }

    const secondToLastLetter = change.currentGuess.charAt(change.currentGuess.length - 2);

    console.debug('checking path from ', secondToLastLetter, 'to', lastLetter);
    const [,, group1] = state.letterMap[secondToLastLetter];
    const [,, group2] = state.letterMap[lastLetter];
    if (group1 === group2) {
      return "Последователни букви мора да се на различни страни!";
    }
  }
  if (change.intent === "rewind") {
    // maybe there's something to check here?
  }
  if (change.intent === "submit") {
    if (state.currentGuess.length < 3) {
      return "Збор мора да има повеќе од 3 букви!";
    }
    if (!state.dictionary.has(state.currentGuess) && !state.__debug) {
      return `${state.currentGuess} не е збор!`;
    }
  }

  return false;
}

export function GameProvider({ children }) {
  const [state, set] = useState(baseGame);
  const { loading } = state;

  function setState(change) {
    const error = checkForErrors(change, state);
    if (error) {
      set({ ...state, error });
    } else {
      set({ ...state, ...change, error: "" });
    }
  }

  const loadDictionary = async () => {
    const dictionary = await loadWords();
    setState({
      dictionary,
      loading: false
    });
  };

  useEffect(() => {
    if (loading) {
      loadDictionary();
    }
  }, [loading]);

  return !loading ? (
    <Game.Provider value={[state, setState]}>
      {children}
      {state.__debug && <pre>{JSON.stringify(state, null, 2)}</pre>}
    </Game.Provider>
  ) : "Се вчитува...";
}
