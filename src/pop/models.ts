import { Anim } from "./AnimationManager";

export type Position = {
  x: number;
  y: number;
};

export type PositionedEntity = {
    pos: Position
}

export type Frame = {
  x: number;
  y: number;
};

export type AnimSignature = {
  [key: string]: Anim;
};

export type Entity = {
  pos: Position;
  w: number;
  h: number;
};

export type CameraViewport = {
  w: number;
  h: number;
};
