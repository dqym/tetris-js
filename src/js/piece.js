import { COLORS, PIECES } from "./config.js";

export class Piece {
    constructor(type, columns) {
        this.shape = PIECES[type];
        this.color = COLORS[type];
        this.x = Math.floor(columns / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
    }

    static random(columns) {
        const keys = Object.keys(PIECES);
        const type = keys[Math.floor(Math.random() * keys.length)];
        return new Piece(type, columns);
    }

    rotate() {
        const rows = this.shape.length;
        const cols = this.shape[0].length;
        const newShape = Array.from({ length: cols }, () => Array(rows).fill(0));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                newShape[x][rows - 1 - y] = this.shape[y][x];
            }
        }
        this.shape = newShape;
    }
}
