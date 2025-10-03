import { Game } from "./game.js";
import { InputHandler } from "./input.js";

const canvas = document.getElementById("game_field_canvas");
const nextCanvas = document.getElementById("next_piece_canvas");

const game = new Game(canvas, nextCanvas);
new InputHandler(game);

document.getElementById("start_button").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
    game.start();
});

window.addEventListener("resize", () => {
    game.nextRenderer.resize();
    game.nextRenderer.draw(game.nextPiece);
});
