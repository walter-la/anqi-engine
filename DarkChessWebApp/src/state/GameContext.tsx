import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  GameState,
  initializeBoard,
  revealPiece,
  applyMove,
} from '../utils/gameRules';

interface GameAction {
  type: 'reveal' | 'move' | 'reset';
  payload?: any;
}

const initialState: GameState = {
  board: initializeBoard(),
  currentPlayer: 'red',
  moveHistory: [],
  isGameOver: false,
  winner: null,
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'reveal':
      return revealPiece(state, action.payload.row, action.payload.col);
    case 'move':
      return applyMove(state, action.payload.from, action.payload.to);
    case 'reset':
      return { ...initialState, board: initializeBoard() };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({ state: initialState, dispatch: () => {} });

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
