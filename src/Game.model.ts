export const NextPlayerMap: Record<string, Player> = {
  'X': 'O',
  'O': 'X',
  '': 'X'
}

export type Player = 'X' | 'O' | '';

export interface GameState {
  squares: Array<string | null>;
  player: Player;
  winner: Player;
  moves: Omit<GameState, 'moves'>[]
}

export const initialState: GameState = {
  squares: Array(9).fill(null),
  player: 'X',
  winner: '',
  get moves() {
    const {squares, player, winner} = this;
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