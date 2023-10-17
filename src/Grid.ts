export default function renderGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number
) {
    const cols = width / cellSize;
    const rows = height / cellSize;

    for(let i = 0 ; i < cols;i++) {
        ctx.save();
        const x = i * cellSize;
        ctx.translate(x, 0);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.strokeStyle = "black";
        ctx.lineTo(0, height);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    for(let i = 0 ; i < rows;i++) {
        ctx.save();
        const y = i * cellSize;
        ctx.translate(0, y);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.strokeStyle = "black";
        ctx.lineTo(width, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

