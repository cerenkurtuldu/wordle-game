import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../../Reactwordle'
import Key from './Key'

export default function Keyboard() {

  const {currentAttempt,gameOver,disabledLetters,almostLetters,correctLetters,onSelectLetter,onEnter,onDelete} = useContext(AppContext)

    const key4 = []
    const key1 = ["A","B","C","Ç","D","E","F","G","Ğ","H"]
    const key2 = ["I","İ","J","K","L","M","N","O","Ö","P"]
    const key3 = ["R","S","Ş","T","U","Ü","V","Y","Z"]


    const handleKeyboard = useCallback((e)=>{
      if(gameOver.gameOver) return;

      if (e.key === "Guess"){
        onEnter()
      }

      if(e.key === "Enter"){
        onEnter()
      }
      else if(e.key === "Backspace"){
        onDelete()
      }
      else{
        key1.forEach(key => {
          if(e.key.toLowerCase() === key.toLowerCase()){
            onSelectLetter(key)
          }
        });
        key2.forEach(key => {
          if(e.key.toLowerCase() === key.toLowerCase()){
            onSelectLetter(key)
          }
        });
        key3.forEach(key => {
          if(e.key.toLowerCase() === key.toLowerCase()){
            onSelectLetter(key)
          }
        });
        key4.forEach(key => {
          if (e.key.toLowerCase()=== key.toLowerCase()){
            onSelectLetter(key)
          }
        });
      }
    },[currentAttempt])


    useEffect(()=>{
      document.addEventListener("keydown",handleKeyboard)
      return ()=>{
        document.removeEventListener("keydown",handleKeyboard)
      }
    },[handleKeyboard])

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
      <div className='line'>
      <Key keyVal={"GUESS"} bigKey/>
        {
          key4.map((value,index)=>{
            return(
              <Key key ={index} keyVal={value} disabled={disabledLetters.includes(value)} almost={almostLetters.includes(value)} correct={correctLetters.includes(value)}/>
            )
          })
        }
      </div>

      <div className='line'>
        {
            key1.map((value,index)=>{
                return(
                    <Key key={index} keyVal={value} disabled={disabledLetters.includes(value)} almost={almostLetters.includes(value)} correct={correctLetters.includes(value)}/>
                )
            })
        }
      </div>
      <div className='line'>
      {
            key2.map((value,index)=>{
                return(
                  <Key key={index} keyVal={value} disabled={disabledLetters.includes(value)} almost={almostLetters.includes(value)} correct={correctLetters.includes(value)}/>
                )
            })
        }
      </div>
      <div className='line'>
      {
            key3.map((value,index)=>{
                return(
                  <Key key={index} keyVal={value} disabled={disabledLetters.includes(value)} almost={almostLetters.includes(value)} correct={correctLetters.includes(value)}/>
                )
            })
        }
        <Key keyVal={"DEL"} bigKey/>
      </div>
    </div>
  )
}