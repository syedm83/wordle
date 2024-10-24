import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, turn, guesses, isCorrect, usedKeys } = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup) //tracks user input

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup]) //removes prev keyup so we dont have multiple

  useEffect(() =>{
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect])

  return (
    <div>
    
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
    <Keypad usedKeys={usedKeys}/>
    </div>
  )
}
