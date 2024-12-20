import React, { useEffect, useState } from "react";
import Wordle from './components/Wordle'

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('https://syedm83.github.io/wordle/database.json')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random()*json.length)]
        setSolution(randomSolution.word)
      })
  }, [])

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App
