import { TwoDimensionalCoordinates } from "./utils";

/**
 * Stores character position in 2D by segment
 */
export class Position {
  private map: Map<number, TwoDimensionalCoordinates> = new Map();
  /**
   * Returns 2D coordinates of segment
   * @param segment Character's segment used as index lookup
   */
  query(segment: number): TwoDimensionalCoordinates {
    return this.map.get(segment);
  }
  /**
   * Sets 2D coordinates for specified segment
   * @param segment Character's segment to use as index
   * @param coordinates Coordinates to set
   */
  update(segment: number, coordinates: TwoDimensionalCoordinates) {
    this.map.set(segment, coordinates);
  }
}
