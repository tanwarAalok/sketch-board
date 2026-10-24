# Sketch Board

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)

A real-time collaborative whiteboard. Everyone who opens the board draws on the same canvas, and strokes, undo/redo and sticky notes are broadcast to all connected users over Socket.IO.

**Live demo:** [sketch-board-rsxq.onrender.com](https://sketch-board-rsxq.onrender.com/) (free tier, the first load can take a few seconds)

![Sketch Board](https://github.com/tanwarAalok/sketch-board/assets/78805153/d6f6a13e-71a1-4474-892b-8236f13b272c)

## Features

- **Pencil** with adjustable colour and stroke width, and an **eraser** with adjustable size
- **Undo and redo**, kept as canvas snapshots and synced across users
- **Sticky notes** you can drag, minimise and remove
- **Image upload** onto a sticky note
- **Download** the board as a PNG
- **Live sync:** `beginPath`, `drawStroke`, `redoUndo` and `createSticky` events are relayed to every client

## Tech stack

HTML5 Canvas and vanilla JavaScript on the client · Node.js, Express and Socket.IO on the server

## Run locally

```bash
git clone https://github.com/tanwarAalok/sketch-board.git
cd sketch-board
npm install
npm start          # or: npm run dev (nodemon)
```

Open http://localhost:3000 in two browser windows to see the sync.
