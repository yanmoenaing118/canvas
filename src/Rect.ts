import Entity from "./Entity";

export default class Rect extends Entity {
  constructor(fill: string) {
    super();
    this.style.fill = fill;
  }
}
