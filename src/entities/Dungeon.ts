import { js as EasyStar } from "easystarjs";
import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileMap from "../pop/TileMap";
import math from "../pop/utils/math";


const tileSize = TILE_SIZE;
const texture = new Texture("images/bravedigger-tiles.png");

// const tileSize = 48;
const tileIndexes = [
  { id: "empty", x: 0, y: 2, walkable: true },
  { id: "wall", x: 2, y: 3 },
  { id: "wall3D", x: 3, y: 3 },
];
function getById(id: string | number): any {
  return tileIndexes.find((frame) => frame.id === id);
}

const path = new EasyStar();
class Dungeon extends TileMap {
  path: EasyStar;
  constructor() {
    const ascii = `
#########################
#####                ####
###                B  ###
##                 ##  ##
#       ########       ##
#   ##       ###        #
#B            ####      #
###             ##      T
####   ##T##    ####    #
#####                  ##
###                  ####
##    ##                #
#   #####        ########
# ########    T##########
#X          #############
#########################`;

    const spawns: any = {
      player: null,
      totems: [],
      bats: [],
      pickups: [],
    };

    const cells = ascii
      .split("\n")
      .slice(1)
      .map((row) => {
        return row.split("");
      });
    const mapH = cells.length;
    const mapW = cells.reduce((max, row) => Math.max(max, row.length), 0);

    // "pad out" the rows so they are all the same length
    const padded = cells.map((row) => {
      const extra = mapW - row.length;
      return [...row, ...Array(extra).fill(" ")];
    });

    // Find spawns, and replace with correct tiles
    const level: any = padded
      .map((row, y) =>
        row.map((cell, x) => {
          switch (cell) {
            case "#":
              return 1;
            case "T":
              spawns.totems.push({ x, y });
              return 1;
            case "B":
              spawns.bats.push({ x, y });
              return 0;
            case "X":
              spawns.player = { x, y };
              return 0;
            default:
              return 0;
          }
        })
      )
      .reduce((ac, el) => [...ac, ...el]);

    // "3d-ify" if no wall below a tile
    for (let y = 1; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        const above = level[(y - 1) * mapW + x];
        const me = level[y * mapW + x];
        if (me === 1 && tileIndexes[above].walkable) {
          level[y * mapW + x] = 2;
        }
      }
    }

    let grid = [];

    for (let i = 0; i < mapW * mapH; i += mapW) {
      grid.push(level.slice(i, i + mapW));
    }

    grid = grid.map((arr) => arr.map((i: any) => i));

    path.setGrid(grid);

    const walkables = tileIndexes
      .map(({ walkable }, i) => (walkable ? i : -1))
      .filter((i) => i != -1);

    path.setAcceptableTiles(walkables);

    super(
      level.map((i: any) => tileIndexes[i]),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture
    );

    this.path = path;
  }
}

export default Dungeon;
