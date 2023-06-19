import { ctx } from ".";

export const renderGrid = (
  rows: number,
  cols: number,
  cellW: number,
  cellH: number
) => {
    for(let i = 0; i < cols; i++) {
        ctx.save();
        ctx.translate(i * cellW, 0);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,rows * cellH);
        ctx.stroke();
        ctx.restore();
    }

    for(let i = 0; i < rows; i++) {
        ctx.save();
        
        ctx.translate(0, i * cellH);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(cols * cellW,0);
        ctx.stroke();
        ctx.restore();
    }
};
