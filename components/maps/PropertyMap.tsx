"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});



function getRiskIcon(risk: number) {
  if (risk > 0.7) return redIcon;
  if (risk > 0.4) return yellowIcon;
  return greenIcon;
}

function getOpportunityScore(risk: number) {
    return Number((1 - risk).toFixed(2));
  }
  


type Property = {
  id: string;
  name: string;
  city: string;
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
      className="h-72 sm:h-80 md:h-96 w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={getRiskIcon(p.riskScore)}
        >
          <Popup>
                <div className="space-y-1">
                    <strong className="block">{p.name}</strong>
                    <span>City: {p.city}</span>
                    <br />
                    <span>Risk Score: {p.riskScore}</span>
                    <br />
                    <span>
                    Opportunity Score:{" "}
                    <strong>{getOpportunityScore(p.riskScore)}</strong>
                    </span>
                </div>
           </Popup>

        </Marker>
      ))}
    </MapContainer>
  );
}
