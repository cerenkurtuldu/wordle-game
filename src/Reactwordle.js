import { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from './Component/Board/Board';
import GameOver from './Component/GameOver/GameOver';
import Keyboard from './Component/Keyboard/Keyboard';
import { boardwordle, generateWords } from './Component/Words/Word';
import { Container } from 'react-bootstrap';
import Txtbox from './Txtbox';

export const AppContext = createContext()

function Reactwordle() {

  const [board,setBoard] = useState(boardwordle)
  const [wordSet,setWordSet] = useState(new Set())
  const [correctWord,setCorrectWord] = useState("")
  const [currentAttempt,setCurrAttempt] = useState({attempt:0,letterPoss:0})
  const [gameOver,setGameOver] = useState({gameOver:false,guessedWord:false})

  const [disabledLetters,setDisabledLetters] = useState([])
  const [almostLetters,setAlmostLetters] = useState([])
  const [correctLetters,setCorrectLetters] = useState([])
  
  
  useEffect(()=>{

    generateWords()
    .then((words)=>{
      // console.log(words);
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })

  },[])

  console.log(correctWord)

  const onSelectLetter=(keyVal)=>{
    if(currentAttempt.letterPoss > 4) return;

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss] = keyVal
    setBoard(newBoard)
    setCurrAttempt({
      attempt:currentAttempt.attempt,
      letterPoss:currentAttempt.letterPoss+1
    })
  }

  const onEnter=()=>{
    if(currentAttempt.letterPoss !== 5) return

    let currWord =""
    for(let i=0;i<5;i++){
      currWord += board[currentAttempt.attempt][i]
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt:currentAttempt.attempt+1,letterPoss:0})
    }
    if(!wordSet.has(currWord.toLowerCase())){
      alert("Word not in the list")
    }

    if(currWord.toLowerCase() === correctWord){
      alert("Congratulations, You won!")
      setGameOver({gameOver:true,guessedWord:true})
    }

    if(currentAttempt.attempt === 4){
      alert("Game Over")
      setGameOver({gameOver:true,guessedWord:false})
      return;
    }
  }

  const onDelete = ()=>{
    if(currentAttempt.letterPoss === 0) return;

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss-1] = ""
    setBoard(newBoard)
    setCurrAttempt({
      ...currentAttempt,
      letterPoss:currentAttempt.letterPoss-1
    })

  }

  return (
    <div className="Reactwordle">
      <Container fluid>
      <AppContext.Provider value={{board,setBoard,correctWord,wordSet,
        setCorrectWord,currentAttempt,setCurrAttempt,gameOver,setGameOver,
        disabledLetters,setDisabledLetters,almostLetters,setAlmostLetters,correctLetters,setCorrectLetters,
        onSelectLetter,onEnter,onDelete
        }}>
      <div className='game'>
        <Board/>
        <Txtbox></Txtbox>
        {gameOver.gameOver ? <GameOver/> :  <Keyboard/>}
       
      </div>

      </AppContext.Provider>
     </Container>
      <br/><br/>
    </div>
  );
}

export default Reactwordle;
