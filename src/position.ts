import { TwoDimensionalCoordinates } from "./utils";

/**
 * Stores character position in 2D by segment
 */
export class Position {
  private map: Map<number, TwoDimensionalCoordinates> = new Map();
  /**
   * Returns `x,y` position of segment
   * @param segment Character's segment
   */
  query(segment: number): TwoDimensionalCoordinates {
    return this.map.get(segment);
  }
  update(segment: number, x: number, y: number) {
    this.map.set(segment, { x: x, y: y });
  }
}
