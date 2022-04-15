import { useState } from "react";
import { Board } from "./Board";
import { GameState, initialState, NextPlayerMap, Player, winningCombinations } from "./Game.model";

export const Game = () => {
  const [{currentMove, moves}, setGameState] = useState(initialState);

  const goToMove = (i: number) => {
    setGameState({ 
      moves: i === 0 ? initialState.moves : moves, 
      currentMove: moves[i] as GameState['currentMove'] 
    });
  }

  const calculateWinner = (squares: GameState['currentMove']['squares']) => {
    return ['X', 'O']
      .map(player => squares.map((s, i) => s === player ? i : null).filter(s => s !== null))
      .map(squares => winningCombinations.some(combo => combo.every(s => squares.includes(s))))
      .reduce((prev, curr, i, [xWinner, oWinner]) => xWinner ? 'X' : oWinner ? 'O' : '', '' as Player);
  }

  const squareClicked = (i: number) => {
    if (currentMove.squares[i] || currentMove.winner) return;

    const squares = [...currentMove.squares];
    squares[i] = currentMove.player;
  
    setGameState({ 
      currentMove: {
        squares,
        player: NextPlayerMap[currentMove.player],
        winner: calculateWinner(squares),
      },
      get moves() {
        return [...moves.slice(0, squares.filter(Boolean).length), this.currentMove]
      }
    } as GameState);
  }

  const status = currentMove.winner 
    ? `${currentMove.winner} Wins!` 
    : `Next player: ${currentMove.player}`;
    
  const listItems = moves.map((move, i) => 
    <li key={i}>
      <button onClick={() => goToMove(i)}>
        {i === 0 ? 'Go to game start' : `Go to move #${i}`}
      </button>
    </li>
  );

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentMove.squares}
          squareClicked={squareClicked} 
        />
      </div>
      <div className="game-info">
        <div> {status} </div>
        <ol>
          {listItems}
        </ol>
      </div>
    </div>
  );
}