import { useState } from "react";
import { Board } from "./Board";
import { GameState, initialState, NextPlayerMap, Player, winningCombinations } from "./Game.model";

export const Game = () => {
  const [gameState, setGameState] = useState(initialState);

  const goToMove = (i: number) => setGameState({...gameState, ...gameState.moves[i] as GameState})

  const calculateWinner = (squares: GameState['squares']) => {
    return ['X', 'O']
      .map(player => squares.map((s, i) => s === player ? i : null).filter(s => s !== null))
      .map(squares => winningCombinations.some(combo => combo.every(s => squares.includes(s))))
      .reduce((prev, curr, i, [xWinner, oWinner]) => xWinner ? 'X' : oWinner ? 'O' : '', '' as Player);
  }

  const squareClicked = (i: number) => {
    if (gameState.squares[i] || gameState.winner) return;

    const squares = [...gameState.squares];
    squares[i] = gameState.player;
    
    const newState = {
      squares,
      player: NextPlayerMap[gameState.player],
      winner: calculateWinner(squares),
    }

    setGameState({
      ...newState,
      moves: [...gameState.moves.slice(0, squares.filter(Boolean).length), newState]
    });
  } 

  const status = gameState.winner ? `${gameState.winner} Wins!` : `Next player: ${gameState.player}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={gameState.squares}
          squareClicked={squareClicked} 
        />
      </div>
      <div className="game-info">
        <div> {status} </div>
        <ol>
          {gameState.moves.map((move, i) => 
            <li key={i}>
              <button onClick={() => goToMove(i)}>
                {i === 0 ? 'Go to game start' : `Go to move #${i}`}
              </button>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}