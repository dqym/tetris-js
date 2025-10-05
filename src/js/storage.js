export class StorageManager {
    saveRecord(nickname, score) {
        let data = JSON.parse(localStorage.getItem("scores")) || {};
        if (!data[nickname] || data[nickname] < score) {
            data[nickname] = score;
        }
        localStorage.setItem("scores", JSON.stringify(data));
    }

    getTopPlayers(limit = 5) {
        let data = JSON.parse(localStorage.getItem("scores")) || {};
        let pairs = Object.entries(data);

        pairs.sort((a, b) => b[1] - a[1]);
        return pairs.slice(0, limit);
    }

    getSortedPlayers() {
        let data = JSON.parse(localStorage.getItem("scores")) || {};
        let pairs = Object.entries(data);
        pairs.sort((a, b) => b[1] - a[1]);
        return pairs;
    }
}
