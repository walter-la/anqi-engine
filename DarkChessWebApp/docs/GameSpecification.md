# Chinese Dark Chess Game Specification

## 1. Introduction

Chinese Dark Chess (Banqi) is a variant of Chinese Chess played on a 4×8 board with 32 face-down pieces. Players alternate revealing or moving pieces. This project implements Dark Chess as a web application using React Native for Web with Expo.

Supported modes:
- Single-player versus AI
- Local two-player
- (Optional) Online multiplayer

## 2. Game Rules

- **Setup**: Place 32 pieces (16 red, 16 black) randomly face-down on a 4×8 grid.
- **Turn**: On your turn you may flip one unrevealed piece or move one of your revealed pieces.
- **Movement**: Pieces move according to their Chinese Chess counterparts once revealed (Soldiers move forward, Cannons capture by jumping, etc.).
- **Capture**: Only revealed pieces can move or capture. Higher ranked pieces capture lower; if ranks are equal, the piece that was revealed first wins.
- **End**: The game ends when a player has no legal move or loses all pieces.

## 3. Data Structures

```ts
export type PieceType = 'General' | 'Chariot' | 'Horse' | 'Elephant' | 'Advisor' | 'Cannon' | 'Soldier';
export interface Piece {
  id: string;
  type: PieceType;
  color: 'red' | 'black';
  revealed: boolean;
  position: { row: number; col: number };
}
export type Board = Array<Array<Piece | null>>;
export interface Move {
  from: { row: number; col: number } | null;
  to: { row: number; col: number };
  piece: Piece;
  action: 'reveal' | 'move' | 'capture';
}
export interface GameState {
  board: Board;
  currentPlayer: 'red' | 'black';
  moveHistory: Move[];
  isGameOver: boolean;
  winner: 'red' | 'black' | null;
}
```

## 4. Project Architecture

- **App.tsx**: Root component providing game context and rendering the main screen.
- **src/components/Board.tsx**: Displays the 4×8 grid of cells.
- **src/components/Cell.tsx**: Handles piece rendering, flips, and movement interactions.
- **src/components/Piece.tsx**: Shows piece graphics by type and color.
- **src/state/GameContext.tsx**: React context with reducer-based state management.
- **src/utils/gameRules.ts**: Pure game logic for initializing the board, validating and applying moves, and checking win conditions.
- **src/ai/SimpleAI.ts**: Simple AI functions to generate and evaluate moves.
- **src/screens/BoardScreen.tsx**: Main gameplay screen.
- **src/assets/pieces/**: Placeholders for 16 SVG/PNG chess piece images. Add
  actual images when running locally.
- **src/assets/sounds/**: Expected audio files `flip.wav`, `move.wav`, and
  `win.wav`; supply these locally.
- **__tests__/**: Jest test files for game logic, context, and UI.

## 5. UI/UX

- Uses CSS Grid/Flexbox for layout.
- Animated flip for revealing pieces using `Animated` with Y-axis rotation.
- Drag and drop movement via `react-native-gesture-handler`.
- Displays current turn, number of remaining flips, restart button, and win modal.
- Responsive design for desktop and mobile browsers.

## 6. Testing

Jest with `@testing-library/react-native` is used for unit and integration tests.

Example `jest.config.js`:

```js
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
```

## 7. Deployment & CI/CD

A GitHub Actions workflow builds and tests the project, then builds the web version with Expo.
Deployment output is located in `web-build/` and can be published to Netlify, Vercel, or GitHub Pages.
