import { ICoord } from './coord.interface';

export interface IClusterResult {
  id: number;
  center: ICoord;
  radius: number;
  members: ICoord[];
  classify: number;
}
