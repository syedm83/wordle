import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';

// components
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import wordList from './words.json';

const getWord = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

export default function Wordle() {
  const [solution, setSolution] = useState('');
  
  useEffect(() => {
    setSolution(getWord());
  }, []);
  
  // Only load the rest of the game logic after the solution is set
  if (!solution) return <div>Loading...</div>;  // Show loading until solution is set

  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  );
}
