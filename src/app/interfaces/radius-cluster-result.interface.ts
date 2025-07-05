import { ICoord } from './coord.interface';

export interface IRadiusClusterResult {
  id: number;
  center: ICoord;
  radius: number; // Actual radius of the cluster in meters
  members: ICoord[];
  classify: number;
}
