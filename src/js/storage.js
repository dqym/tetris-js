export class StorageManager {
    saveRecord(nickname, score) {
        let data = JSON.parse(localStorage.getItem("scores")) || {};
        if (!data[nickname] || data[nickname].score < score) {
            data[nickname] = { score: score, time: Date.now() };
        }
        localStorage.setItem("scores", JSON.stringify(data));
    }

    getTopPlayers(limit = 5) {
        return this.getSortedPlayers().slice(0, limit);
    }

    getSortedPlayers() {
        let data = JSON.parse(localStorage.getItem("scores")) || {};
        let pairs = Object.entries(data);

        pairs.sort((a, b) => {
            if (b[1].score === a[1].score) {
                return a[1].time - b[1].time;
            }
            return b[1].score - a[1].score;
        });

        return pairs;
    }
}

