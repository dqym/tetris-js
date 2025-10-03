import { Ui } from "./ui.js";
import { Field } from "./field.js";
import { Piece } from "./piece.js";
import { Renderer } from "./field_renderer.js";
import { NextPieceRenderer } from "./next_renderer.js";
import { LEVELS } from "./config.js";

export class Game {
    constructor(canvas, nextCanvas, rows = 22, columns = 10) {
        this.rows = rows;
        this.columns = columns;

        const maxHeight = window.innerHeight * 0.95;
        this.cellSize = Math.floor(maxHeight / this.rows);
        this.gridWidth = this.columns * this.cellSize;

        this.canvas = canvas;
        this.canvas.width = this.gridWidth + 10;
        this.canvas.height = this.cellSize * this.rows; // теперь точно помещается


        this.field = new Field(rows, columns);
        this.renderer = new Renderer(this.canvas, this.field, this.cellSize);
        this.renderer.draw(this.field, null);

        this.nextRenderer = new NextPieceRenderer(nextCanvas, this.cellSize);
        this.nextRenderer.resize();
        this.nextRenderer.draw(null);

        this.currentPiece = null;
        this.nextPiece = null;

        this.level = 1;
        this.score = 0;
        this.dropInterval = LEVELS[this.level];
        this.dropCounter = 0;
        this.lastTime = 0;

        this.ui = new Ui();
    }

    start() {
        this.currentPiece = Piece.random(this.columns);
        this.nextPiece = Piece.random(this.columns);
        this.nextRenderer.draw(this.nextPiece);
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.update(deltaTime);
        this.renderer.draw(this.field, this.currentPiece);
        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            if (!this.field.collision(this.currentPiece, 0, 1)) {
                this.currentPiece.y++;
            } else {
                this.lockPiece();
            }
            this.dropCounter = 0;
        }
    }

    lockPiece() {
        this.field.placePiece(this.currentPiece);
        let lines = this.field.clearLines();
        if (lines > 0) {
            this.score += lines * 1000;
            this.ui.updateScore(this.score);
            this.updateLevel();
        }

        this.currentPiece = this.nextPiece;
        this.nextPiece = Piece.random(this.columns);
        this.nextRenderer.draw(this.nextPiece);

        if (this.field.collision(this.currentPiece)) {
            alert("Game Over!");
        }
    }

    updateLevel() {
        if (this.score >= 30000) this.level = 5;
        else if (this.score >= 20000) this.level = 4;
        else if (this.score >= 10000) this.level = 3;
        else if (this.score >= 5000) this.level = 2;
        else this.level = 1;

        this.ui.updateLevel(this.level);
        this.dropInterval = LEVELS[this.level];
    }

    previewRotation(piece) {
        const shape = piece.shape;
        const rows = shape.length;
        const cols = shape[0].length;
        const newShape = Array.from({ length: cols }, () => Array(rows).fill(0));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                newShape[x][rows - 1 - y] = shape[y][x];
            }
        }
        return newShape;
    }
}


