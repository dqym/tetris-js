export class Field {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    }

    placePiece(piece) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x] && piece.y + y >= 0) {
                    this.grid[piece.y + y][piece.x + x] = piece.color;
                }
            }
        }
    }

    clearLines() {
        let cleared = 0;
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(this.columns).fill(0));
                cleared++;
                y++;
            }
        }
        return cleared;
    }

    collision(piece, dx = 0, dy = 0, rotatedShape = null) {
        const shape = rotatedShape || piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    let nx = piece.x + x + dx;
                    let ny = piece.y + y + dy;
                    if (nx < 0 || nx >= this.columns || ny >= this.rows) return true;
                    if (ny >= 0 && this.grid[ny][nx]) return true;
                }
            }
        }
        return false;
    }
}
