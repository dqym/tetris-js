export class Ui {
    constructor() {
        this.scoreValue = document.getElementById("score_value");
        this.levelValue = document.getElementById("level_value");
        this.nicknameValue = document.getElementById("username_value");
        this.nicknameInput = document.getElementById("nickname_input");
        this.startButton = document.getElementById("start_button");

        this.nicknameInput.addEventListener("input", () => {
            this.startButton.disabled = this.nicknameInput.value.trim() === "";
        });
    }

    updateLevel(level) {
        this.levelValue.innerText = level;
    }

    updateScore(score) {
        this.scoreValue.innerText = score;
    }

    updateNickname(nickname) {
        this.nicknameValue.innerText = nickname;
    }

    getNickname() {
        return this.nicknameInput.value;
    }

    showLeaderboard(storage, nickname, score) {
        document.getElementById("final_score").textContent = score;
        const leaderboardDiv = document.getElementById("leaderboard");
        leaderboardDiv.innerHTML = "";

        const topPlayers = storage.getTopPlayers(5);
        const allPlayers = storage.getSortedPlayers();

        let table = document.createElement("table");
        table.classList.add("leaderboard-table");

        topPlayers.forEach(([name, data], index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${name.toUpperCase()}</td>
            <td>${data["score"]}</td>
        `;
            table.appendChild(row);
        });

        leaderboardDiv.appendChild(table);

        let playerIndex = allPlayers.findIndex(([name]) => name === nickname);
        if (playerIndex >= 5) {
            let row = document.createElement("tr");
            row.classList.add("player-row");
            row.innerHTML = `
            <td>${playerIndex + 1}</td>
            <td>${nickname.toUpperCase()}</td>
            <td>${score}</td>
        `;
            table.appendChild(row);
        }
    }
}