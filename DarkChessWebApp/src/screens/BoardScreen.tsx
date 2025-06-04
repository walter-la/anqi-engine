import React from 'react';
import { View, Button } from 'react-native';
import Board from '../components/Board';
import { useGame } from '../state/GameContext';

export default function BoardScreen() {
  const { dispatch } = useGame();
  return (
    <View>
      <Board />
      <Button title="Restart" onPress={() => dispatch({ type: 'reset' })} />
    </View>
  );
}
