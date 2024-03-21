import React, { useContext } from 'react'
import { AppContext } from '../../Reactwordle'

export default function GameOver() {

  const {currentAttempt,gameOver,correctWord} = useContext(AppContext)



  return (
    <div className='gameOver'>
      
      <h3>{gameOver.guessedWord ? "Congrats you won!" : "Game over, you lost"}</h3>
      <h3>Correct word: {correctWord.toUpperCase()}</h3>
      {gameOver.guessedWord && (<h3>You guessed in {currentAttempt.attempt} {currentAttempt.attempt > 2 ? 'attempts' : 'attempt'}</h3>)}
      
    </div>
  )
}