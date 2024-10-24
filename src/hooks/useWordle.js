import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) 
  const [history, setHistory] = useState([]) 
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})


  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => {
        return {key:l, color:'grey'}
    })
    //find any green colors now
    formattedGuess.forEach((l,i) =>{
        if (solutionArray[i] === l.key){
            formattedGuess[i].color = 'green'
            solutionArray[i] = null
        }
    })
    //do it again for yellow
    formattedGuess.forEach((l, i) => {
        if (solutionArray.includes(l.key) && l.color !== 'green'){
            //checks if its included anywhere
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(l.key)] = null
        }
    })
    return formattedGuess
  }
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
        setIsCorrect(true)
      }
      setGuesses(prevGuesses => {
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setHistory(prevHistory => {
        return [...prevHistory, currentGuess]
      })
      setTurn(prevTurn => {
        return prevTurn + 1
      })
      setUsedKeys(prevUsedKeys => {
        formattedGuess.forEach(l => {
          const currentColor = prevUsedKeys[l.key]
  
          if (l.color === 'green') {
            prevUsedKeys[l.key] = 'green'
            return
          }
          if (l.color === 'yellow' && currentColor !== 'green') {
            prevUsedKeys[l.key] = 'yellow'
            return
          }
          if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
            prevUsedKeys[l.key] = 'grey'
            return
          }
        })
  
        return prevUsedKeys
      })
    setCurrentGuess('')
  }
  const handleKeyup = ({ key }) => {

    if(key === 'Enter'){
        if(turn>5){
            console.log('all guesses have been used')
            return
        }
        if(history.includes(currentGuess)){
            console.log('you tried that already!')
            return
        }
        if(currentGuess.length !== 5){
            console.log('must be 5 chars')
            return
        }
        const formatted = formatGuess()
        addNewGuess(formatted)
    }

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
  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle