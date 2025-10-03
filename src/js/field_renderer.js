import { drawCell } from "./utils.js";

export class Renderer {
    constructor(canvas, field, cellSize) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.field = field;
        this.cellSize = cellSize;
        this.offsetX = (canvas.width - field.columns * cellSize) / 2;
        this.offsetY = (canvas.height - field.rows * cellSize) / 2;
    }

    draw(field, currentPiece) {
        const ctx = this.ctx;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.strokeStyle = "lightgray";
        ctx.lineWidth = 1;

        // сетка
        for (let y = 0; y < field.rows; y++) {
            for (let x = 0; x < field.columns; x++) {
                drawCell(this.ctx,
                    this.offsetX + x * this.cellSize,
                    this.offsetY + y * this.cellSize,
                    this.cellSize, "black", "lightgray");
            }
        }

        // блоки в поле
        for (let y = 0; y < field.rows; y++) {
            for (let x = 0; x < field.columns; x++) {
                if (field.grid[y][x]) {
                    drawCell(this.ctx,
                        this.offsetX + x * this.cellSize,
                        this.offsetY + y * this.cellSize,
                        this.cellSize, field.grid[y][x], "black");
                }
            }
        }

        // текущая фигура
        if (currentPiece) {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        drawCell(this.ctx,
                            this.offsetX + (currentPiece.x + x) * this.cellSize,
                            this.offsetY + (currentPiece.y + y) * this.cellSize,
                            this.cellSize, currentPiece.color, "black");
                    }
                }
            }
        }
    }
}
