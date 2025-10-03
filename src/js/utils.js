export function drawCell(ctx, x, y, size, fill_color, stroke_color) {
    ctx.fillStyle = fill_color;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = stroke_color;
    ctx.strokeRect(x, y, size, size);
}
