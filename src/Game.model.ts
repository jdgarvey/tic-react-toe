export const NextPlayerMap: Record<string, Player> = {
  'X': 'O',
  'O': 'X',
  '': 'X'
}

export type Player = 'X' | 'O' | '';

export interface GameState {
  currentMove: {
    squares: Array<string | null>;
    player: Player;
    winner: Player;
  };
  moves: GameState['currentMove'][]
}

export const initialState: GameState = {
  currentMove: {
    squares: Array(9).fill(null),
    player: 'X',
    winner: '',
  },
  get moves() {
    const {squares, player, winner} = this.currentMove;
    return [{squares, player, winner}];
  }
};

export const winningCombinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8] 
];

// for each winning combination
// turn array into a string
// get array of each player's moves, sort, and turn into string
// look for substring of winner into actual moves