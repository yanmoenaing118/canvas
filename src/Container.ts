import Entity from "./Entity";
import { Position } from "./types";

export default class Container extends Entity {
  children: Entity[];
  constructor(x: number, y: number, w: number, h: number) {
    super(x, y, w, h);
    this.children = [];
  }

  add<T extends Entity>(child: T) {
    this.children.push(child);
  }

  // TODO: to implement remove and update methods

  /**
   * Remove a child
   */
  remove() {}

  /**
   * for updating all the children at the same time like removing the dead ones
   */
  update() {}
}
