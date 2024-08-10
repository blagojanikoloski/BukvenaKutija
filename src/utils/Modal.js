import React from 'react';

export default function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div>
        <p>- Зборовите мора да бидат долги најмалку 3 букви</p>
        <p>- Зборовите се формираат со допирање на буквите по редослед</p>
        <p>- Последователните букви не можат да бидат од иста страна</p>
        <p>- Последната буква од зборот станува првата буква од следниот збор</p>
        <p>- Може да се користи иста буква повеќе пати!</p>
        <p>- Користете ги сите букви за да победите!</p>
        <p>
          - Играјте ја оригиналната игра{' '}
          <a href="https://www.nytimes.com/puzzles/letter-boxed" target="_blank" rel="noopener noreferrer">
            овде
          </a>
        </p>
        <button onClick={closeModal}>Затвори</button>
      </div>
    </div>
  );
}
