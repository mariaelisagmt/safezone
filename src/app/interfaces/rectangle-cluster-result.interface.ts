import { ICoord } from './coord.interface';

export interface IRectangleClusterResult {
  id: number;
  bounds: L.LatLngBoundsExpression; // [southWest: L.LatLngExpression, northEast: L.LatLngExpression]
  members: ICoord[];
  classify: number;
  isIsolated: boolean;
}
