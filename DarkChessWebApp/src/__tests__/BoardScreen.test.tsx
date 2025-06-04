import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BoardScreen from '../screens/BoardScreen';
import { GameProvider } from '../state/GameContext';

test('renders board and restart button', () => {
  const { getByText } = render(
    <GameProvider>
      <BoardScreen />
    </GameProvider>
  );
  expect(getByText('Restart')).toBeTruthy();
});
