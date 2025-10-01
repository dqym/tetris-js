// выбор случайной фигуры
function randomPiece() {
    const keys = Object.keys(pieces);
    const type = keys[Math.floor(Math.random()*keys.length)];
    return {
        shape: pieces[type],
        x: Math.floor(columns/2) - Math.floor(pieces[type][0].length/2),
        y: 0,
        color: colors[type]
    };
}

// проверка столкновения
function collision(piece, dx=0, dy=0, rotated=null) {
    const shape = rotated || piece.shape;
    for (let y=0; y<shape.length; y++) {
        for (let x=0; x<shape[y].length; x++) {
            if (shape[y][x]) {
                let nx = piece.x + x + dx;
                let ny = piece.y + y + dy;
                if (nx < 0 || nx >= columns || ny >= rows) return true;
                if (ny >=0 && field[ny][nx]) return true;
            }
        }
    }
    return false;
}

// поворот фигуры
function rotate(piece) {
    const shape = piece.shape;
    const rows = shape.length;
    const cols = shape[0].length;
    let newShape = Array.from({length: cols}, ()=>Array(rows).fill(0));
    for (let y=0; y<rows; y++){
        for (let x=0; x<cols; x++){
            newShape[x][rows-1-y] = shape[y][x];
        }
    }
    return newShape;
}

// перемещаем фигуру в поле
function placePiece(piece) {
    for (let y= 0; y < piece.shape.length; y++) {
        for (let x= 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] && piece.y+y >= 0) {
                field[piece.y + y][piece.x + x] = piece.color;
            }
        }
    }
}

// очистка заполненных линий
function clearLines() {
    for (let y= rows-1; y >= 0; y--) {
        if (field[y].every(cell => cell)) {
            field.splice(y,1);
            field.unshift(Array(columns).fill(0));

            let score_value = parseInt(score.innerText) + 1000;
            score.innerText = score_value.toString();

            updateLevel(score_value);

            y++;
        }
    }
}

function updateLevel(score_value) {
    if (score_value < 5000) currentLevel = 1;
    if (score_value >= 5000 && score_value < 10000) currentLevel = 2;
    if (score_value >= 10000 && score_value < 20000) currentLevel = 3;
    if (score_value >= 20000 && score_value < 30000) currentLevel = 4;
    if (score_value >= 30000) currentLevel = 5;

    dropInterval = levels[currentLevel];

    if (level) {
        level.innerText = currentLevel;
    }
}

// отрисовка
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            ctx.strokeRect(
                offsetX + x * cell_size,
                offsetY + y * cell_size,
                cell_size,
                cell_size
            );
        }
    }

    // закреплённые блоки
    for (let y=0; y<rows; y++) {
        for (let x=0; x<columns; x++) {
            if (field[y][x]) {
                ctx.fillStyle = field[y][x];
                ctx.fillRect(offsetX + x*cell_size, offsetY + y*cell_size, cell_size, cell_size);
                ctx.strokeStyle = "black";
                ctx.strokeRect(offsetX + x*cell_size, offsetY + y*cell_size, cell_size, cell_size);
            }
        }
    }

    // текущая фигура
    if (currentPiece) {
        ctx.fillStyle = currentPiece.color;
        for (let y=0; y<currentPiece.shape.length; y++){
            for (let x=0; x<currentPiece.shape[y].length; x++){
                if (currentPiece.shape[y][x]) {
                    ctx.fillRect(
                        offsetX + (currentPiece.x+x)*cell_size,
                        offsetY + (currentPiece.y+y)*cell_size,
                        cell_size, cell_size
                    );
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(
                        offsetX + (currentPiece.x+x)*cell_size,
                        offsetY + (currentPiece.y+y)*cell_size,
                        cell_size, cell_size
                    );
                }
            }
        }
    }
}

function drawNextPiece() {
    nextPieceCtx.fillStyle = "black";
    nextPieceCtx.fillRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);

    if (!nextPiece) return;

    nextPieceCtx.fillStyle = nextPiece.color;
    let shape = nextPiece.shape;

    let offsetX = Math.floor((nextPieceCanvas.width - shape[0].length * cell_size) / 2);
    let offsetY = Math.floor((nextPieceCanvas.height - shape.length * cell_size) / 2);

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                nextPieceCtx.fillRect(
                    offsetX + x * cell_size,
                    offsetY + y * cell_size,
                    cell_size, cell_size
                );
                nextPieceCtx.strokeStyle = "black";
                nextPieceCtx.strokeRect(
                    offsetX + x * cell_size,
                    offsetY + y * cell_size,
                    cell_size, cell_size
                );
            }
        }
    }
}

function update(deltaTime) {
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        if (!collision(currentPiece, 0, 1)) {
            currentPiece.y++;
        } else {
            placePiece(currentPiece);
            clearLines();
            currentPiece = nextPiece;
            nextPiece = randomPiece();
            drawNextPiece();
            if (collision(currentPiece)) {
                alert("Game Over!");
                return false;
            }
        }
        dropCounter = 0;
    }
    draw();
    return true;
}

// главный игровой цикл
function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    if (update(deltaTime)) {
        requestAnimationFrame(gameLoop);
    }
}

function resizeNextCanvas() {
    const container = document.getElementById("next_container");
    const canvas = document.getElementById("next_piece_canvas");

    canvas.width = container.clientWidth - 30;
    canvas.height = container.clientWidth - 30;
}

const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("start_button");

const colors = {
    I: "cyan",
    O: "yellow",
    T: "purple",
    S: "green",
    Z: "red",
    J: "blue",
    L: "orange"
};

const pieces = {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]],
    J: [[1,0,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]]
};

const levels = {
    1: 500,
    2: 400,
    3: 300,
    4: 250,
    5: 190,
}

let score = document.getElementById("score_value");
let level = document.getElementById("level_value");
const nextPieceCanvas = document.getElementById("next_piece_canvas");
const nextPieceCtx = nextPieceCanvas.getContext("2d");
let currentLevel = 1;
let field = Array.from({ length: rows }, () => Array(columns).fill(0));
let currentPiece = null;
let nextPiece = null;

let lastTime = 0;
let dropInterval = 500;
let dropCounter = 0;

let offsetX = (canvas.width - grid_width) / 2;
let offsetY = (canvas.height - rows * cell_size) / 2;

// управление клавишами
document.addEventListener("keydown", (e)=>{
    if (!currentPiece) return;
    if (e.key==="ArrowLeft" && !collision(currentPiece,-1,0)) currentPiece.x--;
    if (e.key==="ArrowRight" && !collision(currentPiece,1,0)) currentPiece.x++;
    if (e.key==="ArrowDown") {
        while (!collision(currentPiece,0,1)) {
            currentPiece.y++;
        }
        placePiece(currentPiece);
        clearLines();
        currentPiece = nextPiece;
        nextPiece = randomPiece();
        drawNextPiece();
        if (collision(currentPiece)) {
            alert("Game Over!");
            return false;
        }
    }
    if (e.key==="ArrowUp") {
        let rotated = rotate(currentPiece);
        if (!collision(currentPiece,0,0,rotated)) currentPiece.shape = rotated;
    }
});

// запуск игры
startBtn.addEventListener("click", ()=>{
    overlay.style.display = "none";
    field = Array.from({ length: rows }, () => Array(columns).fill(0));
    currentPiece = randomPiece();
    nextPiece = randomPiece();
    resizeNextCanvas();
    drawNextPiece();
    lastTime = 0;
    dropCounter = 0;
    requestAnimationFrame(gameLoop);
});

// window.addEventListener("resize", () => {
//     resizeNextCanvas();
//     drawNextPiece();
// });
