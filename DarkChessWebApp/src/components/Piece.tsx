import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece as PieceType } from '../utils/gameRules';

export default function Piece({ piece }: { piece: PieceType }) {
  return (
    <View style={[styles.container, { backgroundColor: piece.color === 'red' ? '#faa' : '#aaf' }]}>
      <Text style={styles.text}>{piece.type[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
