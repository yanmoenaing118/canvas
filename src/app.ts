import lib from "../pop/index";
const { Container, Text, CanvasRenderer, KeyControls } = lib;

let lastTimeStamp = 0; // will be total
let delta = 0; // 1s/60 60FPS


/** Renderer */
const width = 640;
const height = 480;
const renderer = new CanvasRenderer(width, height);
(document.querySelector("#board") as HTMLElement).appendChild(renderer.view);


/**control */
const control = new KeyControls();

/**Objects */
const scene = new Container();
const message = new Text("Love you", {
  font: "40pt monospace",
  fill: "indigo",
  align: "center",
});

message.pos.x = renderer.w / 2;
message.pos.y = renderer.h / 2;

scene.add(message);
scene.update(0,0);
renderer.render(scene);

console.log(scene)


function loop(ellapsedTime: number) {
  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  if(control.action) {
    message.pos.y -= 100 * delta;
  } else {
    message.pos.y = renderer.h/2 ;
  }


  scene.update(delta,lastTimeStamp);
  renderer.render(scene);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
