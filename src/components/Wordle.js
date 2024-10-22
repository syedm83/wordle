import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup } = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup) //tracks user input

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup]) //removes prev keyup so we dont have multiple


  return (
    <div>current guess - {currentGuess}</div> //shows the user input on the screen
  )
}
