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
  // ЅЉЊЌЏ missing
  const consonants = 'БВГДЃЖЗЈКЛМНПРСТФХЦЧЏШ';
  const vowels = 'АЕИОУ';
  

  async function fetchCombinations() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/blagojanikoloski/ZborovnaKutija/master/src/utils/combinations.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch combinations:', error);
        return [];
    }
  }

  function getTodayCombination(data) {
      if (Array.isArray(data)) {
          const today = new Date();
          const startOfYear = new Date(today.getFullYear(), 0, 0);
          const diff = today - startOfYear;
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);
          console.log('Day of the year:', dayOfYear);

          if (dayOfYear < data.length) {
              const combination = data[dayOfYear];
              return combination;
          } else {
              console.error('Day of the year is out of bounds:', dayOfYear);
              return null;
          }
      } else {
          console.error('Data is not an array');
          return null;
      }
  }

  async function generateLetters() {
    const data = await fetchCombinations();
    if (data) {
        const combination = getTodayCombination(data);
        return combination || []; // Default to an empty array if no combination found
    } else {
        return []; // Default to an empty array if data fetching fails
    }
  }

  export const letters = await generateLetters();
  
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
  