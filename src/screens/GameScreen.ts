import Level from "../Level";
import Camera from "../pop/Camera";
import Container from "../pop/Container";
import Game from "../pop/Game";
import TileSprite from "../pop/TileSprite";
import KeyControls from "../pop/controls/KeyControls";
import Baddie from "../entities/Baddie";
import Squizz from "./../entities/Squizz";
import entity from "../pop/utils/entities";
import math from "../pop/utils/math";

export default class GameScreen extends Container {
  private world = {
    w: 0,
    h: 0,
  };

  game: Game;
  controls: KeyControls;
  level: Level;
  squizz: Squizz;
  baddies: Container;
  onGameOver: (arg?: any) => void;

  constructor(game: Game, controls: KeyControls, onGameOver: (arg?: any) => void) {
    super();
    this.game = game;
    this.controls = controls;
    this.world = {
      w: game.w + game.w * 0.5,
      h: game.h + game.h * 0.4,
    };
    this.level = new Level(this.world.w, this.world.h);
    this.squizz = new Squizz(controls);
    this.squizz.pos.x = game.w / 2 - this.squizz.w * 0.5;
    this.squizz.pos.y = game.h / 2 - this.squizz.h * 0.5;
    this.baddies = this.addBaddies(this.level);
    
    const camera = this.add(new Camera(this.squizz,{
        w: this.game.w,
        h: this.game.h,
    }, this.world));

    camera.add(this.level);
    camera.add(this.squizz);
    camera.add(this.baddies);

    this.onGameOver =onGameOver;

}

  addBaddies(level: Level): Container {
    const baddies = new Container();
    for (let i = 0; i < 5; i++) {
      const b = baddies.add(new Baddie(32 * 5, 0));
      b.pos.y = Math.floor(level.h / 5) * i + level.tileH * 2;
    }
    for (let i = 0; i < 10; i++) {
      const b = baddies.add(new Baddie(0, 32 * 5));
      b.frame = { x: 1, y: 0 };
      b.pos.x = Math.floor(level.w / 10) * i + level.tileW;
    }
    return baddies;
  }

  updateBaddies() {
    this.baddies.map((b: Baddie) => {
      const { pos } = b;
      if (entity.distance(this.squizz as TileSprite, b as TileSprite) < 32) {
        this.squizz.dead = true;
        this.doGameOver();
        if (b.xSpeed) pos.x = -this.level.w;
        else pos.y = -this.level.h;
      }

      if (pos.x > this.level.w) pos.x = -32;
      if (pos.y > this.level.h) pos.y = -32;
    });
  }

  update(dt: number, t: number): void {
    super.update(dt,t); // Don't forget to call super otherwise children won't run thier update method
    this.squizz.pos.x = math.clamp(
        this.squizz.pos.x,
        this.level.bounds.left,
        this.level.bounds.right
      );
      this.squizz.pos.y = math.clamp(
        this.squizz.pos.y,
        this.level.bounds.top,
        this.level.bounds.bottom
      );
    
      this.updateBaddies();
    
      const ground = this.level.checkGround(this.squizz.pos);
      if(ground == 'cleared') {
        this.squizz.dead = true;
        this.doGameOver();
      }
  }

  doGameOver() {
    this.onGameOver();
  }
}
