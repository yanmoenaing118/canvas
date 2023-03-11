class Container {
  pos: any;
  children: Array<any>;
  constructor() {
    console.log('This is container');
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }
}

export default Container;