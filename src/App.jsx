import './App.css';
import { React, useState } from 'react';

import { initializeApp } from 'firebase/app';
import {
  getDatabase, set, ref, onValue,
} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6qHRz3ron9zDsUv_ydJInPIy8LXVKo-M',
  authDomain: 'tic-tac-toe-91656.firebaseapp.com',
  databaseURL: 'https://tic-tac-toe-91656-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tic-tac-toe-91656',
  storageBucket: 'tic-tac-toe-91656.appspot.com',
  messagingSenderId: '828561504456',
  appId: '1:828561504456:web:2c1a2c779b78559ea2cdfd',
};

const DB_NAME = 'tic-tac-toe';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeToDb(state) {
  set(ref(db, `${DB_NAME}/latest`), state);
}

const tictacRef = ref(db, `${DB_NAME}/latest`);

onValue(tictacRef, (snapshot) => {
  const data = snapshot.val();

  console.log(data);
});

function Square({ value, onSquareClick }) {
  return <button onClick={onSquareClick} className="square" type='button'>{value}</button>;
}

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(id) {
    if (gameState[id] !== null || calculateWinner(gameState) !== null) {
      return;
    }
    const newState = [...gameState];
    newState[id] = xIsNext ? 'X' : 'O';
    setXisNext(!xIsNext);

    setGameState(newState);

    // getStateFromDb()
    writeToDb(newState);
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (gameState.indexOf(null) === -1) {
      return 'none';
    }
    return null;
  }

  const winner = calculateWinner(gameState);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  // jsx
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={gameState[0]} onSquareClick={() => handleClick(0)} />
        <Square value={gameState[1]} onSquareClick={() => handleClick(1)} />
        <Square value={gameState[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={gameState[3]} onSquareClick={() => handleClick(3)} />
        <Square value={gameState[4]} onSquareClick={() => handleClick(4)} />
        <Square value={gameState[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={gameState[6]} onSquareClick={() => handleClick(6)} />
        <Square value={gameState[7]} onSquareClick={() => handleClick(7)} />
        <Square value={gameState[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;
