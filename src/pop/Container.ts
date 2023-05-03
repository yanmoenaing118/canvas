import { Position } from "./models";

class Container {
  pos: Position = { x: 0, y: 0 };
  children: Array<any> = [];
  visible: boolean = true;

  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  add<Type extends {pos: Position}>(child: Type) {
    this.children.push(child);
    return child;
  }

  remove<Type extends {pos: Position}>(child: Type) {
    this.children = this.children.filter((c) => c !== child);
    return child;
  }

  update(dt: number, t: number) {
    this.children = this.children.filter((child) => {
      if (child.update) {
        child.update(dt, t, this);
      }
      return child.dead ? false : true;
    });
  }
}

export default Container;
