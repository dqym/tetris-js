function draw_grid() {
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let offset_x = (canvas_width - grid_width) / 2;
    let offset_y = (canvas_height - rows * cell_size) / 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            ctx.strokeRect(
                offset_x + x * cell_size,
                offset_y + y * cell_size,
                cell_size,
                cell_size
            );
        }
    }
}

const canvas = document.getElementById("game_field_canvas");
const ctx = canvas.getContext("2d");

let columns = 10;
let rows = 22;
let cell_size = Math.floor(window.innerHeight / rows);
let grid_width = columns * cell_size;

let canvas_height = window.innerHeight;
let canvas_width = grid_width + 10;

// if (grid_width > window.innerWidth) {
//     cell_size = Math.floor(canvas_width / columns);
//     grid_width = columns * cell_size;
// }

canvas.width = canvas_width;
canvas.height = canvas_height;

draw_grid();
