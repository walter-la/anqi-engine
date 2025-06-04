export type PieceType =
  | 'General'
  | 'Chariot'
  | 'Horse'
  | 'Elephant'
  | 'Advisor'
  | 'Cannon'
  | 'Soldier';

export interface Piece {
  id: string;
  type: PieceType;
  color: 'red' | 'black';
  revealed: boolean;
  position: { row: number; col: number };
}

export type Board = Array<Array<Piece | null>>;

export interface Move {
  from: { row: number; col: number } | null;
  to: { row: number; col: number };
  piece: Piece;
  action: 'reveal' | 'move' | 'capture';
}

export interface GameState {
  board: Board;
  currentPlayer: 'red' | 'black';
  moveHistory: Move[];
  isGameOver: boolean;
  winner: 'red' | 'black' | null;
}

export const BOARD_ROWS = 4;
export const BOARD_COLS = 8;

export function initializeBoard(): Board {
  const pieceTypes: PieceType[] = [
    'General',
    'Advisor',
    'Elephant',
    'Horse',
    'Chariot',
    'Cannon',
    'Soldier',
  ];
  const pieces: Piece[] = [];
  pieceTypes.forEach((type) => {
    const count = type === 'Soldier' ? 5 : type === 'Cannon' ? 2 : 2;
    for (let i = 0; i < count; i++) {
      ['red', 'black'].forEach((color) => {
        pieces.push({
          id: `${color}-${type}-${i}`,
          type,
          color: color as 'red' | 'black',
          revealed: false,
          position: { row: -1, col: -1 },
        });
      });
    }
  });
  const board: Board = Array.from({ length: BOARD_ROWS }, () =>
    Array.from({ length: BOARD_COLS }, () => null)
  );
  // shuffle pieces
  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const idx = Math.floor(Math.random() * pieces.length);
      const piece = pieces.splice(idx, 1)[0];
      piece.position = { row: r, col: c };
      board[r][c] = piece;
    }
  }
  return board;
}

export function revealPiece(state: GameState, row: number, col: number): GameState {
  const piece = state.board[row][col];
  if (!piece || piece.revealed) return state;
  piece.revealed = true;
  state.moveHistory.push({ from: null, to: { row, col }, piece, action: 'reveal' });
  state.currentPlayer = state.currentPlayer === 'red' ? 'black' : 'red';
  return { ...state };
}

export function canMove(state: GameState, from: { row: number; col: number }, to: { row: number; col: number }): boolean {
  const piece = state.board[from.row][from.col];
  if (!piece || !piece.revealed || piece.color !== state.currentPlayer) return false;
  const target = state.board[to.row][to.col];
  // simple move logic: allow move to empty adjacent cell for now
  const dr = Math.abs(from.row - to.row);
  const dc = Math.abs(from.col - to.col);
  if (dr + dc !== 1) return false;
  if (target && target.color === piece.color) return false;
  return true;
}

export function applyMove(state: GameState, from: { row: number; col: number }, to: { row: number; col: number }): GameState {
  if (!canMove(state, from, to)) return state;
  const piece = state.board[from.row][from.col]!;
  const target = state.board[to.row][to.col];
  if (target) {
    state.moveHistory.push({ from, to, piece, action: 'capture' });
  } else {
    state.moveHistory.push({ from, to, piece, action: 'move' });
  }
  state.board[to.row][to.col] = piece;
  state.board[from.row][from.col] = null;
  piece.position = { ...to };
  state.currentPlayer = state.currentPlayer === 'red' ? 'black' : 'red';
  return { ...state };
}

export function isGameOver(state: GameState): boolean {
  // game over when a player has no pieces
  const redPieces = state.board.flat().filter((p) => p && p.color === 'red');
  const blackPieces = state.board.flat().filter((p) => p && p.color === 'black');
  if (redPieces.length === 0 || blackPieces.length === 0) {
    state.isGameOver = true;
    state.winner = redPieces.length === 0 ? 'black' : 'red';
    return true;
  }
  return false;
}
