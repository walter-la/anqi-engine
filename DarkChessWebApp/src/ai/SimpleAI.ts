import { GameState, canMove } from '../utils/gameRules';

export function getAvailableMoves(state: GameState) {
  const moves: { from: { row: number; col: number }; to: { row: number; col: number } }[] = [];
  for (let r = 0; r < state.board.length; r++) {
    for (let c = 0; c < state.board[r].length; c++) {
      const piece = state.board[r][c];
      if (piece && piece.revealed && piece.color === state.currentPlayer) {
        const dirs = [
          { row: r + 1, col: c },
          { row: r - 1, col: c },
          { row: r, col: c + 1 },
          { row: r, col: c - 1 },
        ];
        dirs.forEach((to) => {
          if (
            to.row >= 0 &&
            to.row < state.board.length &&
            to.col >= 0 &&
            to.col < state.board[0].length &&
            canMove(state, { row: r, col: c }, to)
          ) {
            moves.push({ from: { row: r, col: c }, to });
          }
        });
      }
    }
  }
  return moves;
}

export function evaluateBoard(state: GameState): number {
  return state.board.flat().reduce((score, p) => {
    if (!p || !p.revealed) return score;
    const valueMap: Record<string, number> = {
      General: 1000,
      Chariot: 90,
      Horse: 40,
      Elephant: 20,
      Advisor: 20,
      Cannon: 45,
      Soldier: 10,
    };
    const value = valueMap[p.type];
    return p.color === 'red' ? score + value : score - value;
  }, 0);
}

export function getBestMove(state: GameState) {
  const moves = getAvailableMoves(state);
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}
