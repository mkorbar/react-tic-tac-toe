import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Square({value, onSquareClick}) {
  // {value} = props
  // const [value, setValue] = useState(+initial);


  return <button onClick={onSquareClick} className='square'>{value}</button>
}


function App() {

  const [gameState, setGameState] = useState(Array(9).fill(null));
  // state for next player

  function handleClick(id){
    // prohibit re-playing a field
    const newState = [...gameState];
    newState[id] = 'X';
    // toggle next player (set state)

    setGameState(newState);
    // check winner
  }

  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // jsx
  return (
    <>
    <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={gameState[0]} onSquareClick={() => handleClick(0)} />
        <Square value={gameState[1]} onSquareClick={() => handleClick(1)} />
        <Square value={gameState[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={gameState[3]} onSquareClick={() => handleClick(3)} />
        <Square value={gameState[4]} onSquareClick={() => handleClick(4)} />
        <Square value={gameState[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={gameState[6]} onSquareClick={() => handleClick(6)} />
        <Square value={gameState[7]} onSquareClick={() => handleClick(7)} />
        <Square value={gameState[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;
