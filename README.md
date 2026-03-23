# 🎭 इम्पोस्टर वर्ड गेम (Imposter Word Game)

A Pass & Play party game built with React (Vite). Players take turns viewing their secret word or discovering they're the imposter—then discuss and vote!

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Best experienced on mobile (pass the phone between players).

## Tailwind Setup (Already Configured)

This project uses **Tailwind CSS v4** with the Vite plugin. Setup is complete:

1. **Dependencies** (already installed):
   ```bash
   npm install -D tailwindcss @tailwindcss/vite
   ```

2. **Vite config** (`vite.config.ts`): The `tailwindcss()` plugin is added alongside the React plugin.

3. **CSS import** (`src/index.css`): The file includes `@import "tailwindcss";`

No `tailwind.config.js` or PostCSS is required for Tailwind v4.

## How to Play

1. **Setup**: Add 2–10 player names, choose number of imposters, start game.
2. **Reveal**: Pass the phone to each player. They **hold** the button to see their word (or imposter message). Release to hide, then tap **Next Player**.
3. **Discussion**: 60-second timer to discuss who might be the imposter.
4. **Voting**: Each player secretly votes for who they think is the imposter.
5. **Result**: See who the imposter(s) were and vote counts. Play again!

## Project Structure

```
src/
├── App.tsx              # Main state & game flow
├── constants.ts         # Nepali words, messages
├── utils/game.ts        # Random word & imposter logic
├── components/
│   ├── SetupScreen.tsx
│   ├── RevealScreen.tsx
│   ├── DiscussionScreen.tsx
│   ├── VotingScreen.tsx
│   └── ResultScreen.tsx
├── index.css
└── main.tsx
```

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Fully offline (no backend)
