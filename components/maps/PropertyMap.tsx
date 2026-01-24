"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Property = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  riskScore: number;
};

export default function PropertyMap({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India center
      zoom={4}
      className="h-96 w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map((p) => (
        <Marker key={p.id} position={[p.latitude, p.longitude]}>
          <Popup>
            <strong>{p.name}</strong>
            <br />
            Risk Score: {p.riskScore}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
