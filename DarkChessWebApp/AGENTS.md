# Agents

## 1. ProjectSetupAgent
- Initializes Expo project with web+TS support, dependencies, linting, folder structure.
- Output: Project skeleton, config, README.

## 2. GameLogicSpecAgent
- Writes `docs/GameSpecification.md`, implements `src/utils/gameRules.ts` (core game logic functions).
- Output: Docs and core logic.

## 3. UIComponentsAgent
- Creates `src/components/Board.tsx`, `Cell.tsx`, `Piece.tsx`, with web-compatible layout, flip/move logic, and assets.
- Output: UI components.

## 4. StateManagementAgent
- Implements `src/state/GameContext.tsx` with context, actions, reducer, provider, and custom hooks.
- Output: State management.

## 5. AIIntegrationAgent
- Implements `src/ai/SimpleAI.ts`: random/simple AI, exposes `getBestMove`.
- Output: AI logic.

## 6. TestingAgent
- Writes all tests in `__tests__/` for core logic, context, and UI.
- Output: Test suites.

## 7. DeploymentAgent
- Configures `.github/workflows/ci.yml` for install/test/build, writes deploy README section.
- Output: CI/CD and deployment docs.
