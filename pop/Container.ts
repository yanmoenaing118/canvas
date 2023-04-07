class Container {
  pos: any;
  children: Array<any>;
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  add(child: any) {
    this.children.push(child);
    return child;
  }

  remove(child: any) {
    this.children = this.children.filter((c) => c != child);
    return child;
  }

  /**
   * 
   * @param dt delta time
   * @param t total time since the game has started
   */
  update(dt: number,t: number): any {
    this.children = this.children.filter(child => {
      if(child.update) {
        child.update(dt,t,this);
      }
      return child.dead ? false : true;
    })
  }
}

export default Container;
