export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface DriverAttributes {
  id: number;
  name: string;
  vehicle: string;
  geopoints: GeoPoint[];
}
