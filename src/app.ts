import lib from "../pop/index";
const { Container, Text, CanvasRenderer } = lib;

let lastTimeStamp = 0; // will be total
let delta = 0; // 1s/60 60FPS

const width = 640;
const height = 480;
const renderer = new CanvasRenderer(width, height);
(document.querySelector("#board") as HTMLElement).appendChild(renderer.view);
const scene = new Container();
const message = new Text("Love you", {
  font: "40pt monospace",
  fill: "indigo",
  align: "center",
});

message.pos.x = renderer.w / 2;
message.pos.y = renderer.h / 2;

scene.add(message);
renderer.render(scene);

// function loop(ellapsedTime: number) {
//   delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
//   lastTimeStamp = ellapsedTime;

//   requestAnimationFrame(loop);
// }

// requestAnimationFrame(loop);
