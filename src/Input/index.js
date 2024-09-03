import React, { useEffect } from 'react';
import { useGame } from '../context';
import { fancyJoin, checkForWin } from '../utils';
import Modal from '../utils/Modal';
import { createPortal } from 'react-dom';
import { updateStreak } from '../utils';

function WhiteSpan() {
  return <span className="join"> - </span>;
}

function Guesses() {
  const [state] = useGame();
  const { existingWords, error } = state;

  const content = existingWords.length > 0 ?
    fancyJoin(existingWords, WhiteSpan) : <br key="empty" />;

  const errorString = error ? error : <br key="error-empty" />;
  
  useEffect(() => {
    if (state.won) {
      updateStreak();
    }
  }, [state.won]);

  return (
    <div>
      <p>{content}</p>
      <p className="error">{errorString}</p>
      {state.won && (
        <div className="overlay">
          <div className="banner">🎉 Победивте! 🎉</div>
          <div className="new-combination"> Утре нова комбинација! </div>
        </div>
      )}
    </div>
  );
}

function Buttons({ keyDown }) {
  return (
    <div>
      <button onClick={() => keyDown({ key: '__delete' })}>Назад</button>
      <button onClick={() => keyDown({ key: 'Enter' })}>Потврди</button>
      <button onClick={() => keyDown({ key: '/' })}>Помош?</button>
    </div>
  );
}

function createKeyDown(state, setState) {
  return function keyDown(e) {
    const { currentGuess, existingWords, __debug } = state;
    console.debug('keydown', e.key);

    if (e.key === 'Enter') {
      const newWords = [...existingWords, currentGuess];
      setState({
        existingWords: newWords,
        currentGuess: currentGuess.substring(currentGuess.length - 1),
        intent: 'submit',
        won: checkForWin(newWords)
      });
    } else if (e.key === 'Backspace' && currentGuess.length === 1 && existingWords.length > 0) {
      const previousWord = existingWords.pop();
      setState({
        currentGuess: previousWord,
        existingWords,
        intent: 'rewind'
      });
    } else if (e.key === '__delete') {
      if (currentGuess.length === 0) {
        return;
      }
      if (currentGuess.length === 1 && existingWords.length > 0) {
        const previousWord = existingWords.pop();
        setState({
          currentGuess: previousWord,
          existingWords,
          intent: 'rewind'
        });
      } else if (currentGuess.length >= 1) {
        setState({
          currentGuess: currentGuess.substring(0, currentGuess.length - 1),
          intent: 'guess'
        });
        keyDown({ key: 'Backspace' });
      }
    } else if (e.key === '/') {
      setState({ help: true });
    } else if (e.key === '.') {
      setState({
        __debug: !__debug,
        intent: 'debug'
      });
    }
  };
}

export default function Input() {
  const [state, setState] = useGame();
  const { currentGuess, help } = state;

  function onChange(e) {
    console.debug('onChange', e.target.value);
    const value = e.target.value.toUpperCase();

    setState({
      currentGuess: value,
      intent: 'guess'
    });
  }

  const keyDown = createKeyDown(state, setState);
  const closeModal = () => setState({ help: false });

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={keyDown}
        value={currentGuess}
      />
      <Buttons keyDown={keyDown} />
      <Guesses />
      {help && createPortal(
        <Modal closeModal={closeModal} />,
        document.body
      )}
    </div>
  );
}
