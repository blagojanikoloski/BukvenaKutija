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
    const content = await fetch('https://raw.githubusercontent.com/blagojanikoloski/povrzi/master/src/utils/MK-dict.txt')
      .then(res => res.text());
  
    const words = content
      .split('\n')
      .filter(word => word.length >= 3);
  
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
        const response = await fetch('https://raw.githubusercontent.com/blagojanikoloski/povrzi/master/src/utils/combinations.json');
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
          let today = new Date();
          // Add 1 hour to match Macedonian time
          today = new Date(today.getTime() + 1 * 60 * 60 * 1000);
          const startOfYear = new Date(today.getFullYear(), 0, 0);
          const diff = today - startOfYear;
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);

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

    if(winCondition){
      updateStreak();
    }
    return winCondition;
  }

  // Function to generate a UUID-like string
  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Function to get or create a unique user ID with a streak
  export const getUserId = () => {
    try {
      let userId = localStorage.getItem('user_id');
      let streak = localStorage.getItem('user_streak');

      if (!userId) {
        userId = generateUniqueId();
        localStorage.setItem('user_id', userId);
        localStorage.setItem('user_streak', '0'); // Initialize streak
      }

      return {
        userId: userId,
        streak: streak
      };
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      // Fallback mechanism if necessary
      return {
        userId: generateUniqueId(),
        streak: '0'
      };
    }
  };

  export const getUserStreak = () => {
    try {
      // Retrieve the current streak value
      let streak = parseInt(localStorage.getItem('user_streak'), 10) || 0;
  
      // Retrieve the last streak update date
      const lastUpdateDate = localStorage.getItem('last_streak_update');
  
      const currentDateString = getFormattedDate();

      // If there is a last update date, check if it's more than one day old
      if (lastUpdateDate) {
        const lastUpdate = new Date(lastUpdateDate);
        const currentDate = new Date(currentDateString);
  
        // Strip time components to compare dates only
        lastUpdate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
  
        // Reset streak if more than one calendar day has passed
        if (currentDate - lastUpdate > 24 * 60 * 60 * 1000) {
          streak = 0;
          localStorage.setItem('user_streak', '0');
        }
      } 

      return streak;

    } catch (e) {
      console.error('Error accessing streak from localStorage:', e);
      return 0;
    }
  };
  

  // Function to update the streak
  export const updateStreak = (increment = 1) => {
    try {

      const dateString = getFormattedDate();
      
      // Get the last streak update date from localStorage, defaulting to null if not found
      const lastStreakUpdate = localStorage.getItem('last_streak_update') || null;
  
      // Check if it's a new day or if the last update date doesn't exist
      if (lastStreakUpdate !== dateString) {
        let streak = parseInt(localStorage.getItem('user_streak') || '0', 10);
        streak += increment;
        localStorage.setItem('user_streak', streak.toString());
  
        // Update the last streak update date in localStorage
        localStorage.setItem('last_streak_update', dateString);
      }
    } catch (e) {
      console.error('Error updating streak:', e);
    }
  };
  
  function getFormattedDate() {
      // Get the current date and time
      const today = new Date();
      
      // Add 1 hour to match Macedonian time
      // today.setHours(today.getHours() + 1);

      // Extract year, month, and day from the updated date
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(today.getDate()).padStart(2, '0');
      
      // Format the date as YYYY-MM-DD
      const dateString = `${year}-${month}-${day}`;
      
      return dateString;
  }

  
  // This is not an actual UUID, mostly to get around the React key warning
  export function uuid() {
    return Math.random().toString(36).substring(2, 15);
  }
  