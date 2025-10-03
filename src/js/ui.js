export class Ui {
    constructor() {
        this.score_value = document.getElementById("score_value");
        this.level_value = document.getElementById("level_value");
    }

    updateLevel(level) {
        this.level_value.innerText = level;
    }

    updateScore(score) {
        this.score_value.innerText = score;
    }
}