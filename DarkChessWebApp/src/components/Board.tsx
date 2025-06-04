import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import Cell from './Cell';

export default function Board() {
  const { state, dispatch } = useGame();

  return (
    <View style={styles.board}>
      {state.board.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              piece={cell}
              onPress={() => {
                if (!cell || !cell.revealed) {
                  dispatch({ type: 'reveal', payload: { row: r, col: c } });
                } else {
                  // placeholder for move
                }
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
