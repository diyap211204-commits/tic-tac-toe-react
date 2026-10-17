# Tic-Tac-Toe (React + Vite)

Play against the computer (Easy / Medium / Unbeatable) or a friend on the same screen.
Features: 7 colour themes (Sunset is the default), undo, hint, sound toggle, confetti, tilting board, score tracking.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
```
src/
  App.jsx            game UI and state (derived from the move history)
  logic.js           winner check, minimax AI, difficulty levels
  effects.js         sound (Web Audio) and confetti
  themes.js          colour themes (CSS variables)
  components/Mark.jsx  X / O drawing
  styles.css         all styling
```
