export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/**
 * Calculates the Crow distance between 2 geographic points
 * @param {GeoPoint} point1
 * @param {GeoPoint} point2
 *
 * @return {number}
 */
export function calculateCrowDistance(point1: GeoPoint, point2: GeoPoint): number {
  const R = 6371; // km
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const lat1 = toRad(point1.latitude);
  const lat2 = toRad(point2.longitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Converts numeric degrees to radians
 * @param {number} val
 *
 * @return {number}
 */
function toRad(val: number) {
  return val * Math.PI / 180;
}
