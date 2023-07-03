import Texture from "../pop/Texture";
import TileMap from "../pop/TileMap";

const mapW = 12;
const mapH = 10;
const tileSize = 48;
const texture = new Texture("images/bravedigger-tiles.png");

function getById(id: string | number) {
  return tileIndexes.find((frame) => frame.id === id);
}

const tileIndexes = [
  { id: "empty", x: 0, y: 2 },
  { id: "wall", x: 2, y: 2 },
  { id: "wall_end", x: 3, y: 2 },
];

class Dungeon extends TileMap {
  constructor() {
    const level = new Array(mapW * mapH).fill(2);
    super(
      level.map((i) => tileIndexes[Math.round(Math.random() * 2)]),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture
    );
  }
}


export default Dungeon;