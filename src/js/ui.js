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

    showLeaderboard(storage, nickname, score) {
        document.getElementById("final_score").textContent = score;
        const leaderboardDiv = document.getElementById("leaderboard");
        leaderboardDiv.innerHTML = "";

        const topPlayers = storage.getTopPlayers(5);
        const allPlayers = storage.getSortedPlayers();

        let table = document.createElement("table");
        table.classList.add("leaderboard-table");

        topPlayers.forEach(([name, score], index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${name}</td>
            <td>${score}</td>
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
            <td>${nickname}</td>
            <td>${score}</td>
        `;
            table.appendChild(row);
        }
    }
}