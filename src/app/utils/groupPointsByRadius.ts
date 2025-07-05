import { ICoord } from '../interfaces/coord.interface';
import { IRadiusClusterResult } from '../interfaces/radius-cluster-result.interface';

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param coord1 - First coordinate {lat, lng}.
 * @param coord2 - Second coordinate {lat, lng}.
 * @returns Distance in meters.
 */
function haversineDistance(coord1: ICoord, coord2: ICoord): number {
  const R = 6371e3; // metres
  const φ1 = (coord1.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

/**
 * Groups points into clusters based on a maximum radius.
 * @param points - Array of coordinates to cluster.
 * @param maxRadius - Maximum radius for a cluster in meters.
 * @returns Array of clusters, each with a centroid, actual radius, and members.
 */
export function groupPointsByRadius(points: ICoord[], maxRadius: number): IRadiusClusterResult[] {
  if (points.length === 0) return [];

  const clusters: IRadiusClusterResult[] = [];
  const unclusteredPoints = [...points];
  let clusterId = 1;

  while (unclusteredPoints.length > 0) {
    const currentClusterMembers: ICoord[] = [];
    const referencePoint = unclusteredPoints.shift()!; // Take the first point as a reference for the new cluster
    currentClusterMembers.push(referencePoint);

    let i = 0;
    while (i < unclusteredPoints.length) {
      const point = unclusteredPoints[i];
      // Check if the point is within maxRadius of the reference point
      if (haversineDistance(referencePoint, point) <= maxRadius) {
        currentClusterMembers.push(point);
        unclusteredPoints.splice(i, 1); // Remove from unclustered
      } else {
        i++;
      }
    }

    // Calculate centroid and actual radius for the current cluster
    const centerLat =
      currentClusterMembers.reduce((sum, p) => sum + p.lat, 0) / currentClusterMembers.length;
    const centerLng =
      currentClusterMembers.reduce((sum, p) => sum + p.lng, 0) / currentClusterMembers.length;
    const center: ICoord = { lat: centerLat, lng: centerLng };

    let actualRadius = 0;
    if (currentClusterMembers.length > 1) {
      actualRadius = Math.max(...currentClusterMembers.map((p) => haversineDistance(center, p)));
    } else {
      actualRadius = maxRadius; // For single-point clusters, use the maxRadius as visual representation
    }

    clusters.push({
      id: clusterId++,
      center,
      radius: actualRadius,
      members: currentClusterMembers,
      classify: 0, // Will be classified later
    });
  }

  // Sort clusters by the number of members (occurrences)
  clusters.sort((a, b) => a.members.length - b.members.length);

  // Define classification based on order (low, medium, high)
  let classification = 1;
  clusters.forEach((cluster) => {
    cluster.classify = classification++;
  });

  return clusters;
}
