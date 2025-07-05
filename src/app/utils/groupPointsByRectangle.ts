import { ICoord } from '../interfaces/coord.interface';
import { IRectangleClusterResult } from '../interfaces/rectangle-cluster-result.interface';
import * as L from 'leaflet';

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param coord1 - First coordinate {lat, lng}.
 * @param coord2 - Second coordinate {lat, lng}.
 * @returns Distance in meters.
 */
function haversineDistance(coord1: ICoord, coord2: ICoord): number {
  const R = 6371e3; // metres
  const phi1 = (coord1.lat * Math.PI) / 180; // phi, Lambda in radians
  const phi2 = (coord2.lat * Math.PI) / 180;
  const deltaPhi = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLambda = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

/**
 * Calculates the approximate change in latitude/longitude for a given distance in meters.
 * @param meters - Distance in meters.
 * @returns {latDelta, lngDelta} - Approximate change in degrees.
 */
function getLatLonDelta(meters: number): { latDelta: number; lngDelta: number } {
  const earthCircumference = 40075000; // meters
  const latDelta = (meters / earthCircumference) * 360;
  const lngDelta = (meters / (earthCircumference * Math.cos(0))) * 360; // Approximation, more accurate with actual latitude
  return { latDelta, lngDelta };
}

/**
 * Groups points into rectangular clusters based on density.
 * Isolated points are grouped into smaller squares.
 * @param points - Array of coordinates to cluster.
 * @param largeAreaKm2 - Desired area for large rectangles in km².
 * @param smallAreaKm2 - Desired area for small squares in km².
 * @returns Array of clusters, each with bounds, members, and classification.
 */
export function groupPointsByRectangle(
  points: ICoord[],
  largeAreaKm2: number,
  smallAreaKm2: number
): IRectangleClusterResult[] {
  if (points.length === 0) return [];

  const clusters: IRectangleClusterResult[] = [];
  const processedPoints = new Set<ICoord>();
  let clusterId = 1;

  const largeSideMeters = Math.sqrt(largeAreaKm2 * 1_000_000); // Convert km² to m² and get side length
  const smallSideMeters = Math.sqrt(smallAreaKm2 * 1_000_000); // Convert km² to m² and get side length
  const minSideMeters = 200; // Minimum side length for rectangles

  for (const p of points) {
    if (processedPoints.has(p)) continue;

    const nearbyPoints: ICoord[] = [];
    for (const otherP of points) {
      if (p !== otherP && haversineDistance(p, otherP) <= largeSideMeters) {
        nearbyPoints.push(otherP);
      }
    }

    if (nearbyPoints.length === 0) {
      // Isolated point: create a square around it with a minimum side length
      const side = Math.max(smallSideMeters, minSideMeters);
      const { latDelta, lngDelta } = getLatLonDelta(side / 2);
      const southWest = L.latLng(p.lat - latDelta, p.lng - lngDelta);
      const northEast = L.latLng(p.lat + latDelta, p.lng + lngDelta);
      clusters.push({
        id: clusterId++,
        bounds: L.latLngBounds(southWest, northEast),
        members: [p],
        classify: 0,
        isIsolated: true,
      });
      processedPoints.add(p);
    } else {
      // Group into a large rectangle
      const clusterMembers = [p, ...nearbyPoints];
      clusterMembers.forEach((member) => processedPoints.add(member));

      let minLat = Math.min(...clusterMembers.map((m) => m.lat));
      let maxLat = Math.max(...clusterMembers.map((m) => m.lat));
      let minLng = Math.min(...clusterMembers.map((m) => m.lng));
      let maxLng = Math.max(...clusterMembers.map((m) => m.lng));

      // Ensure minimum side length for the bounding box
      const currentWidth = haversineDistance(
        { lat: minLat, lng: minLng },
        { lat: minLat, lng: maxLng }
      );
      const currentHeight = haversineDistance(
        { lat: minLat, lng: minLng },
        { lat: maxLat, lng: minLng }
      );

      if (currentWidth < minSideMeters) {
        const widthToAdd = (minSideMeters - currentWidth) / 2;
        const { lngDelta } = getLatLonDelta(widthToAdd);
        minLng -= lngDelta;
        maxLng += lngDelta;
      }

      if (currentHeight < minSideMeters) {
        const heightToAdd = (minSideMeters - currentHeight) / 2;
        const { latDelta } = getLatLonDelta(heightToAdd);
        minLat -= latDelta;
        maxLat += latDelta;
      }

      const southWest = L.latLng(minLat, minLng);
      const northEast = L.latLng(maxLat, maxLng);

      clusters.push({
        id: clusterId++,
        bounds: L.latLngBounds(southWest, northEast),
        members: clusterMembers,
        classify: 0,
        isIsolated: false,
      });
    }
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
