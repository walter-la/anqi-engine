import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Piece from './Piece';
import { Piece as PieceType } from '../utils/gameRules';

interface Props {
  piece: PieceType | null;
  onPress: () => void;
}

export default function Cell({ piece, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      {piece && piece.revealed && <Piece piece={piece} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
