import Entity from "./Entity";
import { Collection, Position } from "./types";


export default class Container extends Entity {
  children: Collection;
  constructor(x: number, y: number, w: number, h: number) {
    super(x, y, w, h);
    this.children = [];
  }

  add(child: Entity | Container) {
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
