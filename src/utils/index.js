import React from 'react';

export function fancyJoin(elements, joiner) {
  let index = 1;
  let array = [elements[0]];
  
  while (index < elements.length) {
    array.push(React.createElement(joiner, { key: `joiner-${index}` }));
    array.push(elements[index]);
    index++;
  }
  
  return array;
}

  export async function loadWords() {
    const content = await fetch('https://raw.githubusercontent.com/whoeverest/macedonian-words/master/MK-dict.txt')
      .then(res => res.text());
  
    const words = content
      .split('\n')
      .filter(word => word.length > 3);
  
    let dictionary = new Set();
    words.forEach(word => dictionary.add(word.trim().toUpperCase()));
    window.__dict = dictionary;
  
    return dictionary;
  }
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  const consonants = 'БВГДЃЖЗЅЈКЛЉМНЊПРСТЌФХЦЧЏШ';
  const vowels = 'АЕИОУ';
  const randomConsonants = shuffle(consonants.split(""));
  const randomVowels = shuffle(vowels.split(""));
  let _letters = [];
  for (let i = 0; i < 4; i++) {
    const row = randomConsonants.slice(4 * i, 4 * i + 2);
    row.push(randomVowels[i]);
    _letters.push(row);
  }
  
  export const letters = _letters;
  
  export function checkForWin(existingWords) {
    let letterSet = new Set();
    existingWords.forEach(word => word
      .split("").forEach(letter => letterSet.add(letter))
    );
    const winCondition = letterSet.size === 12;
  
    return winCondition;
  }
  
  // This is not an actual UUID, mostly to get around the React key warning
  export function uuid() {
    return Math.random().toString(36).substring(2, 15);
  }
  