import { Game } from "./game.js";

const canvas = document.getElementById("game_field_canvas");
const nextCanvas = document.getElementById("next_piece_canvas");

let game = new Game(canvas, nextCanvas);

document.getElementById("start_button").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";

    game.start();
});

document.getElementById("restart_button").addEventListener("click", () => {
    document.getElementById("game_over_screen").classList.add("hidden");

    game = new Game(canvas, nextCanvas);
    game.start();
});

window.addEventListener("resize", () => {
    game.nextRenderer.resize();
    game.nextRenderer.draw(game.nextPiece);
});
