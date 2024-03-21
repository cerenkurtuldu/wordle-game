
import ReactDOM from 'react-dom/client';
import Board from './Component/Board/Board';
import { boardwordle, generateWords } from './Component/Words/Word';
import { createContext, useEffect, useState } from 'react';

function Txtbox() {
  const [name, setName] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
   
  }

 
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your guess:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
     
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Txtbox />);
export default Txtbox;
