export class InputHandler {
    constructor(game) {
        this.game = game;
        this.bindKeys();
    }

    bindKeys() {
        document.addEventListener("keydown", (e) => {
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

                case "ArrowDown": // мгновенное падение
                    while (!this.game.field.collision(piece, 0, 1)) {
                        piece.y++;
                    }
                    this.game.lockPiece();
                    break;

                case "ArrowUp": // поворот
                    const rotated = this.game.previewRotation(piece);
                    if (!this.game.field.collision(piece, 0, 0, rotated)) {
                        piece.shape = rotated;
                    }
                    break;

                case " ": // пробел — ускоренное падение на 1 шаг
                    if (!this.game.field.collision(piece, 0, 1)) {
                        piece.y++;
                    }
                    break;
            }
        });
    }
}
