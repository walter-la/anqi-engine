import { initializeBoard, revealPiece, applyMove, GameState } from '../utils/gameRules';

test('initializeBoard creates 4x8 board', () => {
  const board = initializeBoard();
  expect(board.length).toBe(4);
  expect(board[0].length).toBe(8);
});

function createState(): GameState {
  return {
    board: initializeBoard(),
    currentPlayer: 'red',
    moveHistory: [],
    isGameOver: false,
    winner: null,
  };
}

test('revealPiece flips piece', () => {
  const state = createState();
  const piece = state.board[0][0]!;
  piece.revealed = false;
  const newState = revealPiece(state, 0, 0);
  expect(newState.board[0][0]!.revealed).toBe(true);
});
