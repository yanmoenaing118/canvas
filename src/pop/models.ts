import { Anim } from "./AnimationManager";

export interface Position {
  x: number;
  y: number;
}

export interface PositionedEntity {
    pos: Position
}

export interface Frame {
  x: number;
  y: number;
}

export interface AnimSignature {
  [key: string]: Anim;
}

export interface Entity {
  pos: Position;
  w: number;
  h: number;
}

export interface CameraViewport {
  w: number;
  h: number;
};

export interface TileBound {
  x: number,
  y: number,
  w: number,
  h: number
}