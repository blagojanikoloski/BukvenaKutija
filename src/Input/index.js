import React from 'react';
import { useGame } from '../context';
import { fancyJoin, checkForWin } from '../utils';
import Modal from '../utils/Modal';
import { createPortal } from 'react-dom';

function WhiteSpan() {
  return <span className="join"> - </span>;
}


function Guesses() {
  const [state] = useGame();
  const { existingWords, error } = state;

  const content = existingWords.length > 0 ?
    fancyJoin(existingWords, WhiteSpan()) : React.createElement('br', null);

  const errorString = error ? error : React.createElement('br', null);
  const bannerClass = 'banner ' + (state.won ? 'winner' : 'loser');

  return React.createElement(
    'div',
    null,
    React.createElement('p', null, content),
    React.createElement('p', { className: 'error' }, errorString),
    React.createElement(
      'div',
      { className: bannerClass },
      '🎉 Победивте! 🎉'
    )
  );
}

function Buttons(props) {
  const { keyDown } = props;

  const restartButton = React.createElement(
    'button',
    { onClick: () => keyDown({ key: 'Escape' }) },
    'Ново'
  );

  const submitButton = React.createElement(
    'button',
    { onClick: () => keyDown({ key: 'Enter' }) },
    'Потврди'
  );

  const deleteButton = React.createElement(
    'button',
    { onClick: () => keyDown({ key: '__delete' }) },
    'Назад'
  );

  const helpButton = React.createElement(
    'button',
    { onClick: () => keyDown({ key: '/' }) },
    'Помош?'
  );

  return React.createElement(
    'div',
    null,
    restartButton,
    submitButton,
    deleteButton,
    helpButton
  );
}

function createKeyDown(state, setState) {
  return function keyDown(e) {
    const { currentGuess, existingWords, __debug } = state;
    console.debug('keydown', e.key);

    if (e.key === 'Enter') {
      const newWords = [...existingWords, currentGuess];
      return setState({
        existingWords: newWords,
        currentGuess: currentGuess.substring(currentGuess.length - 1),
        intent: 'submit',
        won: checkForWin(newWords)
      });
    }

    if (e.key === 'Backspace' && currentGuess.length === 1 && existingWords.length > 0) {
      const previousWord = existingWords.pop();
      return setState({
        currentGuess: previousWord,
        existingWords,
        intent: 'rewind'
      });
    }

    if (e.key === '__delete') {
      if (currentGuess.length === 0) {
        return;
      }
      if (currentGuess.length === 1 && existingWords.length > 0) {
        const previousWord = existingWords.pop();
        return setState({
          currentGuess: previousWord,
          existingWords,
          intent: 'rewind'
        });
      }
      if (currentGuess.length >= 1) {
        setState({
          currentGuess: currentGuess.substring(0, currentGuess.length - 1),
          intent: 'guess'
        });
        return keyDown({ key: 'Backspace' });
      }
    }

    if (e.key === '/') {
      return setState({ help: true });
    }

    if (e.key === 'Escape') {
      return setState({
        currentGuess: '',
        existingWords: [],
        won: false
      });
    }

    if (e.key === '.') {
      return setState({
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

    return setState({
      currentGuess: value,
      intent: 'guess'
    });
  }

  const keyDown = createKeyDown(state, setState);
  const closeModal = () => setState({ help: false });

  return React.createElement(
    'div',
    null,
    React.createElement('input', {
      type: 'text',
      onChange: onChange,
      onKeyDown: keyDown,
      value: currentGuess
    }),
    React.createElement(Buttons, { keyDown: keyDown }),
    React.createElement(Guesses, null),
    help && createPortal(
      React.createElement(Modal, { closeModal: closeModal }),
      document.body
    )
  );
}
