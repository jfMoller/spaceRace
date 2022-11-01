import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Enemy } from "./enemy.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.entities = [
      new Wall(new Position(width / 2, height - 200)),
      new Player(new Position(width / 2 - 50 * 2, height - 100)),
      new Player(new Position(width / 2 + 70, height - 100)),
    ];
    this.wall = this.entities[0];
    this.player1 = this.entities[1];
    this.player2 = this.entities[2];

    //ENEMY SETTINGS
    this.enemiesOn = true;
    this.enemiesSpawnRate = 200; //ms
    //TIME
    this.deltaTime = 0;
    this.tickTime = 0;
    //for handling index values when splicing in tick method of different classes
    this.index = 0;
    //GAME STATES FOR HANDLING MENU
    this.running = true;
  }

  start() {
    tick();
    if (this.enemiesOn) {
      setInterval(() => {
        this.spawnEnemies();
      }, this.enemiesSpawnRate);
    }
  }

  spawnEnemies() {
    let randomDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    if (randomDirection === 0) {
      // from the left side
      this.entities.push(
        new Enemy(
          new Position(0, Math.random() * height - 200),
          new Velocity(400, 0)
        )
      );
    } else if (randomDirection === 1) {
      // from the right side
      this.entities.push(
        new Enemy(
          new Position(800, Math.random() * height - 200),
          new Velocity(-400, 0)
        )
      );
    }
  }
}

export const game = new Game(canvas, ctx);

let lastTick = Date.now();

game.index;

function tick() {
  let currentTick = Date.now();

  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  game.tickTime += game.deltaTime; //game.totalTimePassed

  ctx.clearRect(0, 0, width, height);

  for (game.index = 0; game.index < game.entities.length; ++game.index) {
    let entity = game.entities[game.index];
    entity.draw(game, ctx);
    entity.tick(game);
  }

//END SCREEN PROTOTYPE - move into player when done
if (game.player1.score >= 10 && game.running) {
  alert("Player 1 has won!")
  game.running = false;
  location.reload();
  return;
}

if (game.player2.score >= 10 && game.running) {
  alert("Player 2 has won!")
  game.running = false;
  location.reload();
  return;
}
  requestAnimationFrame(tick);
}

tick();
