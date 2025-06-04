import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { GameProvider, useGame } from '../state/GameContext';

function wrapper({ children }: any) {
  return <GameProvider>{children}</GameProvider>;
}

test('context provides state and dispatch', () => {
  const { result } = renderHook(() => useGame(), { wrapper });
  expect(result.current.state).toBeDefined();
  act(() => {
    result.current.dispatch({ type: 'reset' });
  });
  expect(result.current.state.moveHistory.length).toBe(0);
});
