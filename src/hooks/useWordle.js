import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([]) 
  const [history, setHistory] = useState([]) 
  const [isCorrect, setIsCorrect] = useState(false)

  const formatGuess = () => {
    
  }
  const addNewGuess = () => {

  }
  const handleKeyup = ({ key }) => {

    if(key === 'Backspace'){ //allows user to delete a character
        setCurrentGuess((prev) => {
            return prev.slice(0, -1) //returns a new string to us which is the old string minus the last character
        })
        return //doesnt go any further into the function
    }
    if (/^[A-Za-z]$/.test(key)) { //regex to make sure input is letter not like shift, etc
        if(currentGuess.length < 5){ //5 is the max length of what u can enter
            setCurrentGuess((prev) => { 
                return prev + key //return what ur typing plus what u had alr
            })
        }
    } 

  }
  return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle