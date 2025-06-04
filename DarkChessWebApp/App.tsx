import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GameProvider } from './src/state/GameContext';
import BoardScreen from './src/screens/BoardScreen';

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <BoardScreen />
        <StatusBar style="auto" />
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});
