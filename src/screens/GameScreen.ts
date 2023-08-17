import Bat from "../entities/Bat";
import Bullet from "../entities/Bullet";
import Dungeon from "../entities/Dungeon";
import Player from "../entities/Player";
import Totem from "../entities/Totem";
import Container from "../pop/Container";
import Game from "../pop/Game";
import KeyControls from "../pop/controls/KeyControls";
import math from "../pop/utils/math";

export default class GameScreen extends Container {
  constructor(game: Game, private controls: KeyControls) {
    super();

    const dungeon = this.add(new Dungeon());
    const player = this.add(new Player(controls, dungeon));
    player.pos.x = player.w;
    player.pos.y = player.h;

    for (let i = 0; i < 4; i++) {
      this.add(new Bat(player));
    }

    const bullets = new Container();
    for (let i = 0; i < 2; i++) {
      this.add(
        new Totem(
          player,
          dungeon.mapPositionToPixel({
            x: math.rand(dungeon.mapW),
            y: math.rand(dungeon.mapH),
          }),
          fireBullets
        )
      );
    }

    function fireBullets(bullet: Bullet) {
      bullets.add(bullet);
    }
    this.add(bullets);
  }

  update(dt: number, t: number): void {
      super.update(dt, t);
  }
}
