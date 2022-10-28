import { game } from "./game.js";

export function handleKeyDown(event) {
  if (event.repeat) return;

  if (event.key === "w" || event.key === "W") {
    game.player1.keys.up = true;
  } else if (event.key === "s" || event.key === "S") {
    game.player1.keys.down = true;
  } else if (event.key === "q" || event.key === "Q") {
    game.player1.keys.shoot = true;
  }

  if (event.key === "o" || event.key === "O") {
    game.player2.keys.up = true;
  } else if (event.key === "l" || event.key === "L") {
    game.player2.keys.down = true;
  } else if (event.key === "p" || event.key === "P") {
    game.player2.keys.shoot = true;
    
  }
}

export function handleKeyUp(event) {
  if (event.repeat) return;
  else if (event.key === "w" || event.key === "W") {
    game.player1.keys.up = false;
  } else if (event.key === "s" || event.key === "S") {
    game.player1.keys.down = false;
  } else if (event.key === "q" || event.key === "Q") {
    game.player1.keys.down = false;
  }

  if (event.key === "o" || event.key === "O") {
    game.player2.keys.up = false;
  } else if (event.key === "l" || event.key === "L") {
    game.player2.keys.down = false;
  } else if (event.key === "p" || event.key === "P") {
    game.player2.keys.shoot = false;
  }
}
