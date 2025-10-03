import { drawCell } from "./utils.js";

export class NextPieceRenderer {
    constructor(canvas, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cellSize = cellSize;
    }

    resize() {
        const container = document.getElementById("next_container");
        this.canvas.width = container.clientWidth - 30;
        this.canvas.height = container.clientWidth - 30;
    }

    draw(nextPiece) {
        const ctx = this.ctx;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!nextPiece) return;

        const shape = nextPiece.shape;
        const offsetX = Math.floor((this.canvas.width - shape[0].length * this.cellSize) / 2);
        const offsetY = Math.floor((this.canvas.height - shape.length * this.cellSize) / 2);

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    drawCell(this.ctx,
                        offsetX + x * this.cellSize,
                        offsetY + y * this.cellSize,
                        this.cellSize, nextPiece.color, "black")
                }
            }
        }
    }
}
