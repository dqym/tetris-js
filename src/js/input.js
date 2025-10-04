export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keydownHandler = this.handleKeydown.bind(this);
        document.addEventListener("keydown", this.keydownHandler);
    }

    handleKeydown(e) {
        const piece = this.game.currentPiece;
        if (!piece) return;

        switch (e.key) {
            case "ArrowLeft":
                if (!this.game.field.collision(piece, -1, 0)) {
                    piece.x--;
                }
                break;

            case "ArrowRight":
                if (!this.game.field.collision(piece, 1, 0)) {
                    piece.x++;
                }
                break;

            case "ArrowDown":
                while (!this.game.field.collision(piece, 0, 1)) {
                    piece.y++;
                }
                this.game.lockPiece();
                break;

            case "ArrowUp":
                const rotated = this.game.getRotatedShape(piece);
                if (!this.game.field.collision(piece, 0, 0, rotated)) {
                    piece.shape = rotated;
                }
                break;

            case " ":
                if (!this.game.field.collision(piece, 0, 1)) {
                    piece.y++;
                }
                break;
        }
    }

    detach() {
        document.removeEventListener("keydown", this.keydownHandler);
    }
}
