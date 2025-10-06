import { COLORS, PIECES, JLSTZ_KICKS, I_KICKS } from "./config.js";

export class Piece {
    constructor(type, columns) {
        this.type = type;
        this.shape = PIECES[type];
        this.color = COLORS[type];
        this.x = Math.floor(columns / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
        this.rotation = 0;
    }

    static random(columns) {
        const keys = Object.keys(PIECES);
        const type = keys[Math.floor(Math.random() * keys.length)];
        return new Piece(type, columns);
    }

    rotate(field) {
        const oldShape = this.shape;
        const newShape = this.rotateMatrix(oldShape);

        const oldRot = this.rotation;
        const newRot = (oldRot + 5) % 4;
        const key = `${oldRot}->${newRot}`;

        const kicks = (this.type === "I") ? I_KICKS[key] :
            (this.type === "O" ? [[0,0]] : JLSTZ_KICKS[key]);

        for (const [dx, dy] of kicks) {
            if (!field.collision(this, dx, dy, newShape)) {
                this.shape = newShape;
                this.x += dx;
                this.y += dy;
                this.rotation = newRot;
                return true;
            }
        }

        return false;
    }

    rotateMatrix(shape) {
        const rows = shape.length;
        const cols = shape[0].length;
        const out = Array.from({ length: cols }, () => Array(rows).fill(0));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                out[x][rows-1-y] = shape[y][x];
            }
        }

        return out;
    }
}

