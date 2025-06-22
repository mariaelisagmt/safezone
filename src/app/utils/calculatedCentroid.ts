export function calculateCentroidRadius(point: ICoord[]): { center: ICoord; radius: number } {
  if (point.length === 0) {
    return { center: { lat: 0, lng: 0 }, radius: 0 };
  }

  const latSum = point.reduce((sum, p) => sum + p.lat, 0);
  const lngSum = point.reduce((sum, p) => sum + p.lng, 0);

  const center = {
    lat: latSum / point.length,
    lng: lngSum / point.length,
  };

  const distance = point.map((p) => {
    const latDiff = p.lat - center.lat;
    const lngDiff = p.lng - center.lng;
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  });

  const half = distance.reduce((s, d) => s + d, 0) / distance.length;

  const radius = half * 111_000 * 2 + point.length * 5;

  return { center: center, radius: radius };
}
